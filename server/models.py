from sqlalchemy import Column, Integer, String, LargeBinary, Date, ForeignKey, func
from sqlalchemy.orm import relationship
from .database import Base

# ABookmark model
class ABookmark(Base):
    __tablename__ = 'abookmark'
    
    forum_id = Column(Integer, ForeignKey('forum.forum_id'), primary_key=True, index=True)
    user_id = Column(String(255), ForeignKey('anonymous_user.aid'), primary_key=True, index=True)

# Access model
class Access(Base):
    __tablename__ = 'access'
    
    forum_id = Column(Integer, ForeignKey('forum.forum_id'), primary_key=True, index=True)
    user_id = Column(String(255), ForeignKey('se_user.aid'), primary_key=True, index=True)

# AnonymousUser model
class AnonymousUser(Base):
    __tablename__ = 'anonymous_user'
    
    aid = Column(String(10), primary_key=True, index=True)
    apw = Column(String(255), nullable=False)
    aprofile = Column(LargeBinary)

# Comment model
class Comment(Base):
    __tablename__ = 'comment'
    
    comment_id = Column(Integer, primary_key=True, index=True)
    comment_text = Column(String(255), nullable=False)
    comment_heart = Column(Integer, nullable=False, default=0)

# Forum model
class Forum(Base):
    __tablename__ = 'forum'
    
    forum_id = Column(Integer, primary_key=True, index=True)
    forum_name = Column(String(255), nullable=False, unique=True, index=True)
    description = Column(String(255))
    creator_id = Column(String(10), ForeignKey('se_user.sid'), nullable=False)
    created_time = Column(Date, nullable=False, default=func.current_date())
    icon = Column(LargeBinary)
    wallpaper = Column(String(7), default="#D9D9D9")
    font = Column(Integer, default=0)
    sort_by = Column(Integer, default=0)
    slug = Column(String(255), nullable=False, unique=True)
    board = Column(String(255), nullable=False)

    topics = relationship("ForumTopic", back_populates="forum")

# ForumTag model
class ForumTag(Base):
    __tablename__ = 'forum_tag'
    
    forum_id = Column(Integer, ForeignKey('forum.forum_id'), primary_key=True, index=True)
    tag_id = Column(Integer, ForeignKey('tag.tag_id'), primary_key=True, index=True)

# ForumTopic model
class ForumTopic(Base):
    __tablename__ = 'forum_topic'
    
    forum_id = Column(Integer, ForeignKey('forum.forum_id'), primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey('topic.topic_id'), primary_key=True, index=True)

    forum = relationship("Forum", back_populates="topics")
    topic = relationship("Topic", back_populates="forums")

# Post model
class Post(Base):
    __tablename__ = 'post'
    
    post_id = Column(Integer, primary_key=True, index=True)
    post_head = Column(String(255), nullable=False)
    post_body = Column(String(255))
    heart = Column(Integer, default=0)

# PostComment model
class PostComment(Base):
    __tablename__ = 'post_comment'
    
    post_id = Column(Integer, ForeignKey('post.post_id'), primary_key=True, index=True)
    comment_id = Column(Integer, ForeignKey('comment.comment_id'), primary_key=True, index=True)

# SBookmark model
class SBookmark(Base):
    __tablename__ = 'sbookmark'
    
    forum_id = Column(Integer, ForeignKey('forum.forum_id'), primary_key=True, index=True)
    user_id = Column(String(255), ForeignKey('se_user.sid'), primary_key=True, index=True)

# SEUser model
class SEUser(Base):
    __tablename__ = 'se_user'
    
    sid = Column(String(10), primary_key=True, index=True)
    spw = Column(String(255), nullable=False)
    sprofile = Column(LargeBinary)
    sfile = Column(String(255))

# Tag model
class Tag(Base):
    __tablename__ = 'tag'
    
    tag_id = Column(Integer, primary_key=True, index=True)
    tag_text = Column(String(255), nullable=False)

# Topic model
class Topic(Base):
    __tablename__ = 'topic'
    
    topic_id = Column(Integer, primary_key=True, index=True)
    text = Column(String(255), nullable=False)

    # Correct relationship
    forums = relationship("ForumTopic", back_populates="topic")

# TopicPost model
class TopicPost(Base):
    __tablename__ = 'topic_post'
    
    topic_id = Column(Integer, ForeignKey('topic.topic_id'), primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey('post.post_id'), primary_key=True, index=True)
