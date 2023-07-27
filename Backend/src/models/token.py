import uuid
import datetime

from utils.db import db


class Token(db.Model):
    __tablename__ = 'tokens'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    token = db.Column(db.String(300), nullable=False)
    token_exp = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id):
        self.user_id = user_id
        self.token = uuid.uuid4().hex
        self.token_exp = datetime.datetime.now() + datetime.timedelta(minutes=15)
    
    # def as_dict(self):
    #     return {col.name: getattr(self, col.name) for col in self.__table__.columns}