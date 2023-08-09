from utils.db import db


class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.Integer, primary_key=True)

    messages = db.relationship("Message", backref="chats", cascade="all, delete", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "users": [user.serialize() for user in self.users]
        }