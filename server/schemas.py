from datetime import date
from pydantic import BaseModel, Field
from typing import Optional

# ABookmark Pydantic models
class ABookmarkBase(BaseModel):
    forum_id: int
    user_id: str

class ABookmarkCreate(ABookmarkBase):
    pass

class ABookmark(ABookmarkBase):
    class Config:
        orm_mode = True

# Access Pydantic models
class AccessBase(BaseModel):
    forum_id: int
    user_id: str

class AccessCreate(AccessBase):
    pass

class Access(AccessBase):
    class Config:
        orm_mode = True

# AnonymousUser Pydantic models
class AnonymousUserBase(BaseModel):
    aid: str
    apw: str
    aprofile: Optional[bytes] = None

class AnonymousUserCreate(AnonymousUserBase):
    pass

class AnonymousUser(AnonymousUserBase):
    class Config:
        orm_mode = True

# Comment Pydantic models
class CommentBase(BaseModel):
    comment_text: str
    comment_heart: Optional[int] = 0

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    comment_id: int

    class Config:
        orm_mode = True

# Forum Pydantic models
class ForumBase(BaseModel):
    forum_name: str
    description: Optional[str] = None
    creator_id: str
    created_time: Optional[date] = Field(default_factory=date.today)  # Capture only the date
    icon: Optional[bytes] = None
    wallpaper: Optional[str] = "#D9D9D9"
    font: Optional[int] = 0
    sort_by: Optional[int] = 0
    slug: Optional[str] = None  # Make slug optional
    board: str

class ForumCreate(ForumBase):
    pass

class Forum(ForumBase):
    forum_id: int

    class Config:
        orm_mode = True

# ForumTag Pydantic models
class ForumTagBase(BaseModel):
    forum_id: int
    tag_id: int

class ForumTagCreate(ForumTagBase):
    pass

class ForumTag(ForumTagBase):
    class Config:
        orm_mode = True

# ForumTopic Pydantic models
class ForumTopicBase(BaseModel):
    forum_id: int
    topic_id: int

class ForumTopicCreate(ForumTopicBase):
    pass

class ForumTopic(ForumTopicBase):
    class Config:
        orm_mode = True

# Post Pydantic models
class PostBase(BaseModel):
    post_head: str
    post_body: Optional[str] = None
    heart: Optional[int] = 0

class PostCreate(PostBase):
    pass

class Post(PostBase):
    post_id: int

    class Config:
        orm_mode = True

# PostComment Pydantic models
class PostCommentBase(BaseModel):
    post_id: int
    comment_id: int

class PostCommentCreate(PostCommentBase):
    pass

class PostComment(PostCommentBase):
    class Config:
        orm_mode = True

# SBookmark Pydantic models
class SBookmarkBase(BaseModel):
    forum_id: int
    user_id: str

class SBookmarkCreate(SBookmarkBase):
    pass

class SBookmark(SBookmarkBase):
    class Config:
        orm_mode = True

# SEUser Pydantic models
class SEUserBase(BaseModel):
    sid: str
    spw: str
    sprofile: Optional[bytes] = None
    sfile: Optional[str] = None

class SEUserCreate(SEUserBase):
    pass

class SEUser(SEUserBase):
    class Config:
        orm_mode = True

# Tag Pydantic models
class TagBase(BaseModel):
    tag_text: str

class TagCreate(TagBase):
    pass

class Tag(TagBase):
    tag_id: int

    class Config:
        orm_mode = True

# Topic Pydantic models
class TopicBase(BaseModel):
    text: str

class TopicCreate(TopicBase):
    text: str

class Topic(TopicBase):
    topic_id: int

    class Config:
        orm_mode = True

# TopicPost Pydantic models
class TopicPostBase(BaseModel):
    topic_id: int
    post_id: int

class TopicPostCreate(TopicPostBase):
    pass

class TopicPost(TopicPostBase):
    class Config:
        orm_mode = True