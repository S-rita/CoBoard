from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from slugify import slugify
from typing import List
from .database import SessionLocal, engine
from . import models, schemas
from .schemas import ForumCreate
from .models import Forum 
import logging

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
    forums = db.query(models.Forum).filter(models.Forum.board == board).all()
    return forums

# Route to post new forum in specific board
@app.post("/{board}/")
def create_forum(board: str, forum: ForumCreate, db: Session = Depends(get_db)):
    logging.info(f"Received forum data: {forum}")
    slug = slugify(forum.forum_name)
    db_forum = Forum(
        forum_name=forum.forum_name,
        creator_id=forum.creator_id,
        slug=slug,  # Use the generated or provided slug
        board=board,
        description=forum.description,
        created_time=forum.created_time,
        icon=forum.icon,
        wallpaper=forum.wallpaper,
        font=forum.font,
        sort_by=forum.sort_by
    )
    db.add(db_forum)
    db.commit()
    db.refresh(db_forum)
    return db_forum

# Route to get all topics from a specific forum
@app.get("/{board}/{forum_name}/", response_model=List[schemas.Topic])
async def get_topics(board: str, forum_name: str, db: Session = Depends(get_db)):
    forum = db.query(models.Forum).filter(
        models.Forum.board == board,
        models.Forum.forum_name == forum_name
    ).first()
    
    if not forum:
        raise HTTPException(status_code=404, detail="Forum not found")
    
    forum_topics = db.query(models.ForumTopic).filter(
        models.ForumTopic.forum_id == forum.forum_id
    ).all()
    
    topic_ids = [ft.topic_id for ft in forum_topics]
    
    if topic_ids:
        topics = db.query(models.Topic).filter(
            models.Topic.topic_id.in_(topic_ids)
        ).all()
    else:
        topics = []

    return topics

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
