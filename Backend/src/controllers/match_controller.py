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

    dislike_list = [User.id for User in user_db.dislikes_to]
    like_list = [User.id for User in user_db.likes_to]
    query = db.select(User).filter(
            User.id != user_db.id,
            User.id.not_in(dislike_list),
            User.id.not_in(like_list)
        )

    posible_match_db = db.session.execute(query).scalars().first()


    if posible_match_db is None:
        return jsonify({"message": "Match not found"}), 400
    else:
        posible_match = posible_match_db.serialize_for_match()

        diference = relativedelta(
                datetime.datetime.now(), 
                posible_match["profile"]["date_born"]
            )
        posible_match["profile"]["age"]=diference.years

        return posible_match