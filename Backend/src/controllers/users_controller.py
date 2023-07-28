import datetime
import bcrypt
from flask import jsonify, request
from flask_mail import Message

from utils.db import db
from utils.mail import mail
from models.users import User
from models.token import Token
from templates.activation_mjs import email_text, email_html
from templates.recovery_password import recovery_text, recovery_html


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



def forgot_password():
    user_email = request.json.get('email')
    user_db = User.query.filter_by(email=user_email).first()

    if user_db is None:
        return jsonify({"message": "User not found in database"}), 404

    elif user_db:
        existing_token = Token.query.filter_by(user_id=user_db.id).first()

        if existing_token and (existing_token.token_exp > datetime.datetime.now()):
            return jsonify({"message": "Token already exist and is available."}), 400

        else:
            if existing_token and (existing_token.token_exp < datetime.datetime.now()):
                db.session.delete(Token.query.get(existing_token.id))
            
            token_db = Token(user_id=user_db.id)
            db.session.add(token_db)
            db.session.commit()

            msg = Message(
                subject='COSMOS Password-recovery',
                sender='noreply@demo.com',
                recipients=[user_db.email],
                body=recovery_text(user_db.user_name, token_db.token),
                html=recovery_html(user_db.user_name, token_db.token)
            )   
            mail.send(msg)
            return jsonify({"message": "Email sent"}), 200



def new_password(token):
    token_data = Token.query.filter_by(token=token).first()
    if not token_data:
        return jsonify({"message": "Invalid token"}), 404

    elif (token_data.token_exp < datetime.datetime.now()):
        Token.query.filter_by(token=token).delete()
        db.session.commit()
        return jsonify({"message": "Token expired"}), 403

    else:
        new_password = request.json.get("password")
        user_db = User.query.filter_by(id=token_data.user_id).first()

        if user_db is None:
            return jsonify({"message": "User not found"}), 404
        else:
            user_db.password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            Token.query.filter_by(token=token).delete()
            db.session.commit()
            return jsonify({"message": "Password updated"}), 200



def delete_user(user):
    db.session.delete(User.query.get(user["id"]))
    db.session.commit()

    return jsonify({'message': 'User deleted'})