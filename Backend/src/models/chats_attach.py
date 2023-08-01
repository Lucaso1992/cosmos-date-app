from utils.db import db


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"), nullable=False)
    date = db.Column(db.DateTime, default=db.func.current_timestamp())
    url = db.Column(db.String(100), nullable=False)

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}