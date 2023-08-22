import datetime
from dateutil.relativedelta import relativedelta
from flask import request, jsonify
from sqlalchemy import not_

from utils.db import db
from models.users import User
from models.profile_info import Profile
# from models.profile_dislikes import Profile_Dislike

def get_match(user):
    user_db = User.query.get(user["id"])

    dislike_list = [User.id for User in user_db.dislikes_to]
    like_list = [User.id for User in user_db.likes_to]

    if user_db.profile.love_interest=="Indifferent":
        query = db.select(User).filter(
                User.id != user_db.id,
                User.id.not_in(dislike_list),
                User.id.not_in(like_list),
            )
    if user_db.profile.love_interest!="Indifferent":
        query = db.select(User).filter(
                User.id != user_db.id,
                User.id.not_in(dislike_list),
                User.id.not_in(like_list),
                Profile.user_id == User.id,
                Profile.gender == user_db.profile.love_interest
            )

    posible_match_db = db.session.execute(query).scalars().first()


    if posible_match_db is None:
        return jsonify({"message": "Match not found"}), 404
    
    else:
        posible_match = posible_match_db.serialize_for_match()

        diference = relativedelta(
                datetime.datetime.now(), 
                posible_match["profile"]["date_born"]
            )
        posible_match["profile"]["age"]=diference.years

        return jsonify(posible_match), 200