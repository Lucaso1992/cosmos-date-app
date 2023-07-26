import datetime
import bcrypt
from flask import jsonify, request
from flask_mail import Message

from utils.db import db
from utils.mail import mail
from models.users import User
from models.token import Token
from templates.activation_mjs import email_text, email_html


def post_user():
    user_username = request.json.get('user_name')
    user_email = request.json.get('email')
    user_password = request.json.get('password')
    
    new_user = User(
        user_name = user_username,
        email = user_email,
        password = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt())
    )
    db.session.add(new_user)
    db.session.commit()

    token_db = Token(user_id = new_user.id)
    db.session.add(token_db)
    db.session.commit()


    msg = Message(
        subject='COSMOS Authentication Email',
        sender='noreply@demo.com',
        recipients=[new_user.email],
        body=email_text(new_user.user_name, token_db.token),
        html=email_html(new_user.user_name, token_db.token)
    )
    mail.send(msg)

    return jsonify({"message": "User created successfully"})



def set_active(token):
    token_data = Token.query.filter_by(token=token).first()
    if token_data is None:
        return jsonify({"message": "Invalid token"}), 404
    

    elif (token_data.token_exp < datetime.datetime.now()):
        Token.query.filter_by(token=token).delete()
        db.session.commit()
        return jsonify({"message": "Token expired"}), 403

    else:
        user_db = User.query.filter_by(id=token_data.user_id).first()
        if user_db is None:
            return jsonify({"message": "User not found"}), 404
 
        else:
            user_db.is_active = True
            Token.query.filter_by(token=token).delete()
            db.session.commit()
            return jsonify({"message": "User activated"}), 200



def delete_user(user):
    db.session.delete(User.query.get(user["id"]))
    db.session.commit()

    return jsonify({'message': 'User deleted'})