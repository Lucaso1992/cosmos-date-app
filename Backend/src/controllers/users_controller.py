from flask import jsonify, request
# from flask_mail import Message
import bcrypt

from utils.db import db
# from utils.mail import mail
from models.users import User


def post_user():
    user_username = request.json.get('user_name')
    user_email = request.json.get('email')
    user_password = request.json.get('password')
    
    new_user = User(
        user_name = user_username,
        email = user_email,
        password = user_password,
    )

    pw_hash = bcrypt.hashpw(new_user.password.encode('utf-8'), bcrypt.gensalt())
    new_user.password = pw_hash

    db.session.add(new_user)
    db.session.commit()

    # msg = Message(
    #     subject='Authentication Email',
    #     sender='noreply@gmail.com',
    #     recipients=['datingstars23@gmail.com'],
    #     body='Estoy tratando de mostrar un proceso de autenticacion',
    #     html='<p>Estoy tratando de mostrar un proceso de autenticacion</p>'
    # )
    # mail.send(msg)

    return jsonify(new_user.serialize()), 201


def delete_user(user):
    db.session.delete(User.query.get(user["id"]))
    db.session.commit()

    return jsonify({'message': 'User deleted'})