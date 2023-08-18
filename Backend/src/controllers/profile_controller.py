import datetime
from flask import request, jsonify

from models.users import User
from models.profile_info import Profile
from models.profile_likes import Profile_Like
from models.chats import Chat
from models.user_chat import User_chat
from utils.db import db


def dislike_profile(user):
    user_dislike = request.json.get('user_dislike')
    user_db = User.query.get(user["id"])

    disliked_user = User.query.get(user_dislike)
    user_db.dislikes_to.append(disliked_user)

    db.session.commit()
    return user_db.serialize_with_likes()


def like_profile(user):
    user_like = request.json.get('user_like')
    user_db = User.query.get(user["id"])

    liked_user = User.query.get(user_like)
    user_db.likes_to.append(liked_user)

    if liked_user.id == user_db.id:
        return jsonify({"message": "You can't like yourself"}), 400
    
    else:
        matched_user = Profile_Like.query.filter_by(
                user_from_id=liked_user.id, 
                user_to_id=user_db.id
            ).first()
        if matched_user:
            user_chats = User_chat.query.filter_by(user_id=user_db.id).all()
            reciever_chats = User_chat.query.filter_by(user_id=liked_user.id).all()
            
            if any(chat in reciever_chats for chat in user_chats):
                db.session.commit()
                return user_db.serialize_with_likes()

            else:
                new_chat = Chat()
                db.session.add(new_chat)

                user_db.chats.append(new_chat)
                liked_user.chats.append(new_chat)
                db.session.commit()
                return user_db.serialize_with_likes()
        else:
            db.session.commit()
            return user_db.serialize_with_likes()


def info_profile(user):
    profile_data = Profile.query.filter_by(user_id=user["id"]).first()
    born_date = datetime.datetime.strptime(request.json.get("date_born"), "%Y-%m-%d")

    if profile_data:
        profile_data.profile_image = request.json.get("profile_image")
        profile_data.zodiac_sign = request.json.get("zodiac_sign")
        profile_data.location = request.json.get("location")
        profile_data.gender = request.json.get("gender")
        profile_data.love_interest = request.json.get("love_interest")
        profile_data.date_born = born_date
        profile_data.description = request.json.get("description")
        profile_data.height = request.json.get("height")
        db.session.commit()
        
        user_updated = User.query.get(user["id"])
        return user_updated.serialize_with_profile()
    else:
        new_profile_data = Profile(**request.json)
        new_profile_data.user_id = user["id"]
        new_profile_data.date_born = born_date

        db.session.add(new_profile_data)
        db.session.commit()

        user_updated = User.query.get(user["id"])

        return user_updated.serialize_with_profile()