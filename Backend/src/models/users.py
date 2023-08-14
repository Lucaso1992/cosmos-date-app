from utils.db import db
from models.profile_likes import Profile_Like
from models.profile_dislikes import Profile_Dislike


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(25), unique=True, nullable=False)
    user_name = db.Column(db.String(20))
    is_active = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime,
                           default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime,
                           default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())
    token = db.relationship("Token", backref="users", cascade="all, delete", lazy=True)
    profile = db.relationship("Profile", 
                              backref="users", 
                              uselist=False, 
                              cascade="all, delete", 
                              lazy=True)

    chats = db.relationship("Chat",
                            secondary='users_chats',
                            backref="users",
                            cascade="all, delete",
                            lazy=True)
    
    likes_from = db.relationship('User',
                                  secondary='profile_Likes',
                                  primaryjoin=(id==Profile_Like.user_to_id),
                                  secondaryjoin=(id==Profile_Like.user_from_id),
                                  back_populates="likes_to",
                                  lazy=True)
    likes_to = db.relationship('User',
                                secondary='profile_Likes',
                                primaryjoin=(id==Profile_Like.user_from_id),
                                secondaryjoin=(id==Profile_Like.user_to_id),
                                back_populates="likes_from",
                                lazy=True)
    
    dislikes_from = db.relationship('User',
                                secondary='profile_Dislikes',
                                primaryjoin=(id==Profile_Dislike.user_to_id),
                                secondaryjoin=(id==Profile_Dislike.user_from_id),
                                back_populates="dislikes_to",
                                lazy=True)
    dislikes_to = db.relationship('User',
                                secondary='profile_Dislikes',
                                primaryjoin=(id==Profile_Dislike.user_from_id),
                                secondaryjoin=(id==Profile_Dislike.user_to_id),
                                back_populates="dislikes_from",
                                lazy=True)
    
    

    def __repr__(self):
        return f'<User {self.email}>'

    
    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    def serialize_with_profile(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "profile": self.profile.as_dict() if self.profile else {}
        }
    
    def serialize_with_likes(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "matches": [like_from.serialize() for like_from in self.likes_from if like_from in self.likes_to],
            "likes_to": [like_to.serialize() for like_to in self.likes_to]
        }
    
    def serialize_with_chats(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "chats": [chat.as_dict() for chat in self.chats]
        }
    
    def serialize_for_match(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "profile": self.profile.as_dict() if self.profile else {}
        }