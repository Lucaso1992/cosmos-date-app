from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity, create_refresh_token

from controllers.users_controller import post_user, delete_user

users = Blueprint('users',__name__)

@users.route("/api/users/", methods=['POST'])
def index():
    try:
        if "email" not in request.json or "user_name" not in request.json or "password" not in request.json:
            return 'missing an "email", "user_name" or "password" keys in json', 400
        else:
            return post_user()
    except IntegrityError:
        return 'User with that email is already registered', 400



@users.route('/api/users/', methods=['GET'])
@jwt_required(refresh=True)
def index_user():
    user = get_jwt_identity()

    if request.method == 'GET':
        return jsonify(user)
    

    
@users.route('/api/users/', methods=['DELETE'])
@jwt_required(refresh=True)
def index_update_user():
    user = get_jwt_identity()

    if request.method == 'PUT':
        return jsonify(message="User updated"), 200
    
    if request.method == 'DELETE':
        return delete_user(user), 200