from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import desc, and_
from slugify import slugify
from typing import List
from .database import SessionLocal, engine
from . import models, schemas
import logging
import base64

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

logger = logging.getLogger(__name__)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to get all forums from a specific board
@app.get("/coboard/{board}/", response_model=schemas.BoardResponse)
async def get_forums(board: str, db: Session = Depends(get_db)):
    try:
        # Fetch forums for the given board
        forums = db.query(models.Forum).filter(models.Forum.board == board).order_by(desc(models.Forum.forum_id)).all()
        
        # Prepare forum data with icon encoding
        forum_data = []
        for forum in forums:
            forum_dict = forum.__dict__.copy()
            if forum.icon:
                forum_dict['icon'] = base64.b64encode(forum.icon).decode('utf-8')
            else:
                forum_dict['icon'] = None
            forum_data.append(schemas.Forum(**forum_dict))
        
        # Fetch tags for the given board
        tags = db.query(models.Tag).filter(models.Tag.board == board).order_by(desc(models.Tag.use)).all()
        tag_data = [schemas.Tag(**tag.__dict__) for tag in tags]

        # Fetch forum-tag relations for all fetched forums
        forum_ids = [forum.forum_id for forum in forums]
        forumtag = db.query(models.ForumTag).filter(models.ForumTag.forum_id.in_(forum_ids)).all()
        forumtag_data = [schemas.ForumTag(**ft.__dict__) for ft in forumtag]
        
        # Return the data wrapped in the response schema
        return schemas.BoardResponse(forums=forum_data, tags=tag_data, forumtag=forumtag_data)

    except SQLAlchemyError as e:
        logger.error(f"Database error while fetching forums: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error occurred")
    except Exception as e:
        logger.error(f"Unexpected error while fetching forums: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")

# Route to post new forum in specific board
@app.post("/coboard/{board}/", response_model=schemas.Forum)
async def create_forum(
    board: str,
    forum: schemas.ForumCreate,
    db: Session = Depends(get_db)
):
    try:
        if board != forum.board:
            raise HTTPException(status_code=400, detail="Board in URL doesn't match board in forum data")
        
        icon_data = None
        if forum.icon:
            try:
                icon_data = base64.b64decode(forum.icon)
                if len(icon_data) > 1048576:
                    raise HTTPException(status_code=400, detail="Icon file too large")
            except base64.binascii.Error:
                raise HTTPException(status_code=400, detail="Invalid base64 for icon")
        
        # Create the new forum instance
        new_forum = models.Forum(
            forum_name=forum.forum_name,
            description=forum.description,
            creator_id=forum.creator_id,
            created_time=forum.created_time,
            wallpaper=forum.wallpaper,
            font=forum.font,
            sort_by=forum.sort_by,
            slug=forum.slug,
            board=forum.board,
            icon=icon_data
        )
        
        # Add the forum to the session and commit to get the forum_id
        db.add(new_forum)
        db.commit()  # This will generate the forum_id
        db.refresh(new_forum)  # Refresh to get the updated object
        
        # Handle tags if provided
        if hasattr(forum, 'tags') and forum.tags is not None:
            for tag in forum.tags:
                tag_exists = db.query(models.Tag).filter(models.Tag.tag_id == tag.tag_id).first()
                if tag_exists:
                    new_forum_tag = models.ForumTag(
                        forum_id=new_forum.forum_id,
                        tag_id=tag.tag_id
                    )
                    db.add(new_forum_tag)
                    tag_exists.use += 1
                else:
                    db.rollback()
                    raise HTTPException(status_code=400, detail=f"Tag with ID {tag.tag_id} does not exist")
        
        # Commit the tags
        db.commit()
        
        # Prepare response data
        response_data = {
            "forum_id": new_forum.forum_id,
            "forum_name": new_forum.forum_name,
            "description": new_forum.description,
            "creator_id": new_forum.creator_id,
            "created_time": new_forum.created_time,
            "wallpaper": new_forum.wallpaper,
            "font": new_forum.font,
            "sort_by": new_forum.sort_by,
            "slug": new_forum.slug,
            "board": new_forum.board,
        }
        
        if new_forum.icon:
            response_data['icon'] = base64.b64encode(new_forum.icon).decode('utf-8')
        
        return schemas.Forum(**response_data)
    
    except SQLAlchemyError as e:
        db.rollback()
        error_msg = f"Database error while creating forum: {str(e)}"
        raise HTTPException(status_code=500, detail=error_msg)
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        error_msg = f"Unexpected error while creating forum: {str(e)}"
        raise HTTPException(status_code=500, detail=error_msg)

# Route to get all topics and forum detail from a specific forum
@app.get("/coboard/{board}/{forum_name}/", response_model=schemas.ForumResponse)
async def get_topics(
    board: str,
    forum_name: str,
    db: Session = Depends(get_db)
):
    try:
        db_forum = db.query(models.Forum).filter(
            models.Forum.board == board,
            models.Forum.slug == forum_name
        ).first()
        
        if not db_forum:
            raise HTTPException(status_code=404, detail="Forum not found")
        
        response_data = db_forum.__dict__.copy()
        if db_forum.icon:
            response_data['icon'] = base64.b64encode(db_forum.icon).decode('utf-8')

        # Adjust tag query to correctly join with Forum and get relevant tags
        tags = db.query(models.Tag).join(models.ForumTag).filter(
            models.ForumTag.forum_id == db_forum.forum_id
        ).all()

        # Manually construct the list of tags as dictionaries
        tag_data = [tag.__dict__.copy() for tag in tags]

        board_tag = db.query(models.Tag).filter(models.Tag.board == board).order_by(desc(models.Tag.use)).all()

        board_tag_data = [bt.__dict__.copy() for bt in board_tag]
        
        # Get topics associated with the forum
        topics = db.query(models.Topic).join(models.ForumTopic).filter(
            models.ForumTopic.forum_id == db_forum.forum_id
        ).all()
        
        topic_data = []
        for topic in topics:
            topic_dict = topic.__dict__.copy()
            
            # Fetch posts for each topic
            posts = db.query(models.Post).join(models.TopicPost).filter(
                models.TopicPost.topic_id == topic.topic_id
            ).all()
            
            post_data = []
            for post in posts:
                post_dict = post.__dict__.copy()
                
                # Fetch comments for each post
                comments = db.query(models.Comment).join(models.PostComment).filter(
                    models.PostComment.post_id == post.post_id
                ).all()
                
                post_dict['comments'] = [comment.__dict__.copy() for comment in comments]
                post_data.append(post_dict)
            
            topic_dict['posts'] = post_data
            topic_data.append(topic_dict)

        response_data['btags'] = board_tag_data
        response_data['tags'] = tag_data
        response_data['topics'] = topic_data
        return schemas.ForumResponse(**response_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route to post new topic
@app.post("/coboard/{board}/{forum_name}/topic", response_model=schemas.Topic)
async def create_topic(board: str, forum_name: str, topic_data: schemas.TopicCreate, db: Session = Depends(get_db)):
    forum = db.query(models.Forum).filter(
        models.Forum.board == board,
        models.Forum.slug == forum_name
    ).first()

    if not forum:
        raise HTTPException(status_code=404, detail="Forum not found")

    new_topic = models.Topic(text=topic_data.text)
    db.add(new_topic)
    db.commit()
    db.refresh(new_topic)

    forum_topic = models.ForumTopic(forum_id=forum.forum_id, topic_id=new_topic.topic_id)
    db.add(forum_topic)
    db.commit()

    return new_topic

# Route to update forum
@app.put("/coboard/{board}/{forum_name}/setting", response_model=schemas.ForumResponse)
async def update_forum(
    board: str,
    forum_name: str,
    forum: schemas.ForumCreate,
    db: Session = Depends(get_db),
):
    try:
        # Fetch the existing forum from the database
        db_forum = db.query(models.Forum).filter(
            models.Forum.board == board,
            models.Forum.slug == forum_name
        ).first()
        
        if not db_forum:
            raise HTTPException(status_code=404, detail="Forum not found")

        # Update forum attributes, including the icon
        for key, value in forum.dict(exclude_unset=True).items():
            print(f"Updating {key} with value: {value}")
            if key == 'icon' and value:
                try:
                    # Decode the Base64 icon and validate its size
                    decoded_icon = base64.b64decode(value)
                    if len(decoded_icon) > 1048576:  # Limit to 1 MB
                        raise HTTPException(status_code=400, detail="Icon file too large")
                    db_forum.icon = decoded_icon
                except base64.binascii.Error:
                    raise HTTPException(status_code=400, detail="Invalid base64 for icon")
            elif key != 'tags':  # Skip 'tags' as they will be handled separately
                setattr(db_forum, key, value)

        # Handle tags update
        if hasattr(forum, 'tags') and forum.tags is not None:
            # Remove all existing tags
            existing_tags = db.query(models.ForumTag).filter(models.ForumTag.forum_id == db_forum.forum_id).all()
            existing_tag_ids = {tag.tag_id for tag in existing_tags}

            # Add new tags
            for tag in forum.tags:
                if tag.tag_id not in existing_tag_ids:
                    new_forum_tag = models.ForumTag(
                        forum_id=db_forum.forum_id,
                        tag_id=tag.tag_id
                    )
                    db.add(new_forum_tag)

                    # Increment use count for the new tag
                    tagupdate = db.query(models.Tag).filter(models.Tag.tag_id == tag.tag_id).first()
                    if tagupdate:
                        tagupdate.use += 1

        # Commit the changes to the database
        db.commit()
        db.refresh(db_forum)

        # Prepare response data
        response_data = db_forum.__dict__.copy()
        if db_forum.icon:
            response_data['icon'] = base64.b64encode(db_forum.icon).decode('utf-8')

        # Fetch updated tags
        tags = db.query(models.Tag).join(models.ForumTag).filter(
            models.ForumTag.forum_id == db_forum.forum_id
        ).all()
        tag_data = [tag.__dict__.copy() for tag in tags]

        # Fetch board tags
        board_tags = db.query(models.Tag).filter(models.Tag.board == board).order_by(desc(models.Tag.use)).all()
        board_tag_data = [bt.__dict__.copy() for bt in board_tags]

        # Fetch topics
        topics = db.query(models.Topic).join(models.ForumTopic).filter(
            models.ForumTopic.forum_id == db_forum.forum_id
        ).all()
        topic_data = [topic.__dict__.copy() for topic in topics]

        response_data['tags'] = tag_data
        response_data['btags'] = board_tag_data
        response_data['topics'] = topic_data

        return schemas.ForumResponse(**response_data)

    except SQLAlchemyError as e:
        db.rollback()
        error_msg = f"Database error while updating forum: {str(e)}"
        raise HTTPException(status_code=500, detail=error_msg)
    except Exception as e:
        error_msg = f"Unexpected error while updating forum: {str(e)}"
        raise HTTPException(status_code=500, detail=error_msg)

# Route to create post 
@app.post("/coboard/{board}/{forum_name}/post", response_model=schemas.Post)
async def create_post(
    board: str,
    forum_name: str,
    post_data: schemas.PostCreate,
    topic_id: int,
    db: Session = Depends(get_db)
):
    # First, find the forum
    forum = db.query(models.Forum).filter(
        models.Forum.board == board,
        models.Forum.slug == forum_name
    ).first()
    
    if not forum:
        raise HTTPException(status_code=404, detail="Forum not found")

    # Then, find the topic
    topic = db.query(models.Topic).filter(
        models.Topic.topic_id == topic_id,
    ).first()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    # Create new post
    new_post = models.Post(
        post_head=post_data.post_head,
        post_body=post_data.post_body,
        heart=post_data.heart,
        spost_creator=post_data.spost_creator,
        apost_creator=post_data.apost_creator
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    # Create relationship between topic and post
    topic_post = models.TopicPost(topic_id=topic.topic_id, post_id=new_post.post_id)
    db.add(topic_post)
    db.commit()

    return new_post

# Route to update like
@app.put("/coboard/{board}/{forum_name}/like", response_model=schemas.LikeResponse)
async def update_like(
    board: str,
    forum_name: str,
    like_data: schemas.LikeUpdate,
    db: Session = Depends(get_db)
):
    try:
        if like_data.item_type == "post":
            item = db.query(models.Post).filter(models.Post.post_id == like_data.item_id).first()
            if not item:
                raise HTTPException(status_code=404, detail="Post not found")
            item.heart += 1
        elif like_data.item_type == "comment":
            item = db.query(models.Comment).filter(models.Comment.comment_id == like_data.item_id).first()
            if not item:
                raise HTTPException(status_code=404, detail="Comment not found")
            item.comment_heart += 1
        else:
            raise HTTPException(status_code=400, detail="Invalid item type")

        db.commit()
        db.refresh(item)

        return schemas.LikeResponse(
            item_id=item.post_id if like_data.item_type == "post" else item.comment_id,
            item_type=like_data.item_type,
            likes=item.heart if like_data.item_type == "post" else item.comment_heart
        )

    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Database error while updating like: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error occurred")
    except Exception as e:
        logger.error(f"Unexpected error while updating like: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")
    
# Route to add comment
@app.post("/coboard/{board}/{forum_name}/comment", response_model=schemas.Comment)
async def add_comment(
    board: str,
    forum_name: str,
    comment_data: schemas.CommentCreate,
    post_id: int,
    db: Session = Depends(get_db)
):
    try:
        post = db.query(models.Post).filter(models.Post.post_id == post_id).first()
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")

        new_comment = models.Comment(comment_text=comment_data.comment_text, scomment_creator=comment_data.scomment_creator, acomment_creator=comment_data.acomment_creator )
        db.add(new_comment)
        db.commit()
        db.refresh(new_comment)

        post_comment = models.PostComment(post_id=post.post_id, comment_id=new_comment.comment_id)
        db.add(post_comment)
        db.commit()

        return new_comment

    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Database error while adding comment: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error occurred")
    except Exception as e:
        logger.error(f"Unexpected error while adding comment: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")
    
# Route to get user
@app.get("/", response_model=schemas.UserResponse)
async def get_user(db: Session = Depends(get_db)):
    try:
        # Fetch SE users
        se_users = db.query(models.SEUser).all()
        se_data = []
        for user in se_users:
            user_dict = user.__dict__.copy()
            if user.sprofile:
                user_dict['sprofile'] = base64.b64encode(user.sprofile).decode('utf-8')
            else:
                user_dict['sprofile'] = None
            se_data.append(schemas.SEUser(**user_dict))

        # Fetch anonymous users
        anonymous_users = db.query(models.AnonymousUser).all()
        anonymous_data = []
        for user in anonymous_users:
            user_dict = user.__dict__.copy()
            if user.aprofile:
                user_dict['aprofile'] = base64.b64encode(user.aprofile).decode('utf-8')
            else:
                user_dict['aprofile'] = None
            anonymous_data.append(schemas.AnonymousUser(**user_dict))
        
        # Return the data wrapped in the response schema
        return schemas.UserResponse(se=se_data, anonymous=anonymous_data)

    except SQLAlchemyError as e:
        logger.error(f"Database error while fetching users: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error occurred")
    except Exception as e:
        logger.error(f"Unexpected error while fetching users: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")