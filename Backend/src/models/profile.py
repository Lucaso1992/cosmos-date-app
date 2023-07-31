from utils.db import db


class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    zodiac_sign = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    love_interest = db.Column(db.String(20), nullable=False)
    date_born = db.Column(db.db.DateTime, nullable=False)
    description = db.Column(db.String(300))
    location_born = db.Column(db.String(80))
    time_born = db.Column(db.String(15))
    height = db.Column(db.String(15))


    # def __init__(self, user_id):
    #     self.user_id = user_id
    
    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}