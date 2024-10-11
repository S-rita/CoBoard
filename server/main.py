from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import desc
from slugify import slugify
from typing import List
from .database import SessionLocal, engine
from . import models, schemas
import logging
import base64

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Allow React frontend to communicate with FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React's default dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create all tables in the database
models.Base.metadata.create_all(bind=engine)  # This is generally preferred

logger = logging.getLogger(__name__)

# Dependency to get a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to get all forums from a specific board
@app.get("/{board}/", response_model=List[schemas.Forum])
async def get_forums(board: str, db: Session = Depends(get_db)):
    try:
        forums = db.query(models.Forum).filter(models.Forum.board == board).order_by(desc(models.Forum.forum_id)).all()
        
        # Prepare response data with icon if available
        response_data = []
        for forum in forums:
            forum_dict = forum.__dict__.copy()
            if forum.icon:
                forum_dict['icon'] = base64.b64encode(forum.icon).decode('utf-8')
            else:
                forum_dict['icon'] = None
            response_data.append(schemas.Forum(**forum_dict))

        return response_data

    except SQLAlchemyError as e:
        logger.error(f"Database error while fetching forums: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error occurred")
    except Exception as e:
        logger.error(f"Unexpected error while fetching forums: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")

# Route to post new forum in specific board
@app.post("/{board}/", response_model=schemas.Forum)
async def create_forum(
    board: str,
    forum: schemas.ForumCreate,
    db: Session = Depends(get_db)
):
    try:
        # Validate board
        if board != forum.board:
            raise HTTPException(status_code=400, detail="Board in URL doesn't match board in forum data")

        # Process icon if present
        icon_data = None
        if forum.icon:
            try:
                icon_data = base64.b64decode(forum.icon)
                if len(icon_data) > 1048576:  # 1MB limit
                    raise HTTPException(status_code=400, detail="Icon file too large")
            except base64.binascii.Error:
                raise HTTPException(status_code=400, detail="Invalid base64 for icon")

        # Create the Forum instance
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

        # Add and commit to the database
        db.add(new_forum)
        db.commit()
        db.refresh(new_forum)

        # Prepare response
        response_data = new_forum.__dict__.copy()
        if new_forum.icon:
            response_data['icon'] = base64.b64encode(new_forum.icon).decode('utf-8')

        return schemas.Forum(**response_data)

    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Database error while creating forum: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error occurred")
    except HTTPException as he:
        raise he  # Re-raise HTTP exceptions
    except Exception as e:
        logger.error(f"Unexpected error while creating forum: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")

# Route to get all topics and forum detail from a specific forum
@app.get("/{board}/{forum_name}/", response_model=schemas.ForumResponse)
async def get_topics(
    board: str,
    forum_name: str,
    db: Session = Depends(get_db)
):
    try:
        db_forum = db.query(models.Forum).filter(
            models.Forum.board == board,
            models.Forum.forum_name == forum_name
        ).first()
        
        if not db_forum:
            raise HTTPException(status_code=404, detail="Forum not found")

        # Prepare response
        response_data = db_forum.__dict__.copy()
        if db_forum.icon:
            response_data['icon'] = base64.b64encode(db_forum.icon).decode('utf-8')
        
        # Fetch topics associated with this forum
        topics = db.query(models.Topic).join(models.ForumTopic).filter(models.ForumTopic.forum_id == db_forum.forum_id).all()
        response_data['topics'] = topics

        return schemas.ForumResponse(**response_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route to post new topic
@app.post("/{board}/{forum_name}/", response_model=schemas.Topic)
async def create_topic(board: str, forum_name: str, topic_data: schemas.TopicCreate, db: Session = Depends(get_db)):
    # Step 1: Check if the forum exists
    forum = db.query(models.Forum).filter(
        models.Forum.board == board,
        models.Forum.forum_name == forum_name
    ).first()

    if not forum:
        raise HTTPException(status_code=404, detail="Forum not found")

    # Step 2: Create a new topic
    new_topic = models.Topic(text=topic_data.text)  # Assuming your Topic model has a 'text' field
    db.add(new_topic)
    db.commit()
    db.refresh(new_topic)  # Get the new topic's ID

    # Step 3: Associate the topic with the forum in the forum_topic table
    forum_topic = models.ForumTopic(forum_id=forum.forum_id, topic_id=new_topic.topic_id)
    db.add(forum_topic)
    db.commit()

    return new_topic

# Route to update forum
@app.put("/{board}/{forum_name}/", response_model=schemas.Forum)
async def update_forum(
    board: str,
    forum_name: str,
    forum: schemas.ForumCreate,
    db: Session = Depends(get_db),
):
    try:
        db_forum = db.query(models.Forum).filter(
            models.Forum.board == board,
            models.Forum.forum_name == forum_name
        ).first()
        
        if not db_forum:
            raise HTTPException(status_code=404, detail="Forum not found")

        # Update fields
        for key, value in forum.dict(exclude_unset=True).items():
            if key == 'icon' and value:
                try:
                    decoded_icon = base64.b64decode(value)
                    if len(decoded_icon) > 1048576:  # 1MB limit
                        raise HTTPException(status_code=400, detail="Icon file too large")
                    setattr(db_forum, key, decoded_icon)
                except base64.binascii.Error:
                    raise HTTPException(status_code=400, detail="Invalid base64 for icon")
            else:
                setattr(db_forum, key, value)

        db.commit()
        db.refresh(db_forum)

        # Prepare response
        response_data = db_forum.__dict__.copy()
        if db_forum.icon:
            response_data['icon'] = base64.b64encode(db_forum.icon).decode('utf-8')

        return schemas.Forum(**response_data)

    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Database error while updating forum: {str(e)}")
        raise HTTPException(status_code=500, detail="Database error occurred")
    except Exception as e:
        logger.error(f"Unexpected error while updating forum: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")