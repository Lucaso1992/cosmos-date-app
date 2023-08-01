from flask import request, jsonify
from flask_jwt_extended import create_refresh_token
import bcrypt

from models.users import User

def login_authentication():
    email_user = request.json["email"]
    password_user = request.json["password"]

    user = User.query.filter_by(email=email_user).first()
    if user is None:
        return jsonify({"message": "User not found!"}), 404
    
    elif user.is_active == False:
        return jsonify({"message": "User mail not validated"}), 403
    
    elif bcrypt.checkpw(password_user.encode('utf-8'), user.password):
<<<<<<< HEAD
        refresh_token = create_refresh_token(identity=user.serialize())
=======
        refresh_token = create_refresh_token(identity=user.serialize_with_likes())
>>>>>>> ef57709715cf0005eaad1b567003d45d9cd3e076
        return jsonify(refresh_token=refresh_token), 200
    else:
        return 'Wrong password!!', 401