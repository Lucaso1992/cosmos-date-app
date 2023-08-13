from flask import request, jsonify

from utils.db import db
from models.users import User

def get_match(user):
    # user_db = User.query.get(user["id"])
    posible_match_db = User.query.filter(User.id != user["id"]).\
        filter(~User.dislikes_to.any(User.id == user["id"])).\
        filter(~User.likes_to.any(User.id == user["id"])).first()
    
    if posible_match_db is None:
        return jsonify({"message": "Match not found"}), 400

    return posible_match_db.serialize_for_match()