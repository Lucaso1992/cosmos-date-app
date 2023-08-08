from utils.db import db


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_name = db.Column(db.String(20), db.ForeignKey("users.user_name"), nullable=False)
    date = db.Column(db.DateTime, default=db.func.current_timestamp())
    text = db.Column(db.String(300), nullable=False)

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}
    
    def serialize(self):
        return {
            'id': self.id,
            'chat_id': self.chat_id,
            'user_id': self.user_id,
            'user_name': self.user_name,
            'text': self.text
        }