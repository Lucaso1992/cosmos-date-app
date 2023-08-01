from utils.db import db


class Profile_Like(db.Model):
    __tablename__ = 'profile_Likes'
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    def __repr__(self):
        return f'<Profile_Likes {self.id}>'