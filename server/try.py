from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models

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
models.User.__table__.create(bind=engine, checkfirst=True)

# Dependency to get a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to get all users
@app.get("/users/")
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

# Route to create a new user
@app.post("/users/")
def create_user(
    sid: str = Form(...), 
    spw: str = Form(...), 
    sprofile: UploadFile = File(None), 
    sfile: UploadFile = File(None), 
    db: Session = Depends(get_db)
):
    db_user = models.User(
        sid=sid, 
        spw=spw, 
        sprofile=sprofile.file.read() if sprofile else None, 
        sfile=sfile.filename if sfile else None
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Route to get a specific user
@app.get("/users/{sid}")
def read_user(sid: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.sid == sid).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
