from utils.db import db


class Porfile_Like(db.Model):
    __tablename__ = 'porfile_Likes'
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    def __repr__(self):
        return f'<Porfile_Likes {self.id}>'