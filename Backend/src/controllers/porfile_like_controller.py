from flask import request, jsonify

from models.users import User
from utils.db import db

def like_porfile(user):
    user_likes = request.json.get('user_likes')
    user_db = User.query.get(user["id"])

    liked_user_db = []

    for liked in user_likes:
        liked_user = User.query.get(liked)
        if liked_user:
            liked_user_db.append(liked_user)

    user_db.likes_to = liked_user_db
    db.session.commit()

    return user_db.serialize_with_likes()