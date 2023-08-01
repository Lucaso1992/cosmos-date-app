from utils.db import db


class Horoscope(db.Model):
    __tablename__ = 'horoscopes'
    id = db.Column(db.Integer, primary_key=True)
    zodiac_sign = db.Column(db.String(20), nullable=False)
    horoscope = db.Column(db.String(400), nullable=False)
    
    # def as_dict(self):
    #     return {col.name: getattr(self, col.name) for col in self.__table__.columns}