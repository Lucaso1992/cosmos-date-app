from utils.db import db


class User_chat(db.Model):
    __tablename__ = 'users_chats'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey("chats.id"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "chat_id": self.chat_id
        }