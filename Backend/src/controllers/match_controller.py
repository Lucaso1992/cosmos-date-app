import datetime
from dateutil.relativedelta import relativedelta
from flask import request, jsonify
from sqlalchemy import not_

from utils.db import db
from models.users import User
from models.profile_likes import Profile_Like
from models.profile_dislikes import Profile_Dislike

def get_match(user):
    user_db = User.query.get(user["id"])
    # posible_match_db = User.query.filter(User.id != user["id"]).\
    #     filter(not_(User.id.in_(user_db.dislikes_to))).\
    #     filter(not_(User.id.in_(user_db.likes_to))).first()

    # posible_match_db = User.query.filter(User.id != user_db.id).\
    #     filter(not_(Profile_Dislike.user_to_id == User.id)). \
    #     filter(not_(Profile_Like.user_to_id == User.id)).first()

    posible_match_db = User.query.filter(User.id != user_db.id).\
        filter(~User.dislikes_to.any(User.id == user["id"])).\
        filter(~User.likes_to.any(User.id == user["id"])).first()
    

    if posible_match_db is None:
        return jsonify({"message": "Match not found"}), 400
    else:
        posible_match = posible_match_db.serialize_for_match()

        diference = relativedelta(
                datetime.datetime.now(), 
                posible_match["profile"]["date_born"]
            )
        posible_match["profile"]["age"]=diference.years

        return jsonify(posible_match), 200