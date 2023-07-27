from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity

from controllers.users_controller import post_user, set_active, forgot_password, new_password, delete_user

users = Blueprint('users',__name__)

@users.route("/api/users", methods=['POST'])
def create_user():
    try:
        if "email" not in request.json or "user_name" not in request.json or "password" not in request.json:
            return 'missing an "email", "user_name" or "password" keys in json', 400
        else:
            return post_user(), 201
    except IntegrityError:
        return {"message": "User with that email is already registered"}, 400



@users.route("/api/users/activate/<token>", methods=['GET'])
def activate_user(token):
    try:
        return set_active(token)
    except Exception:
        return jsonify({"message": "Internal server error"}), 500


@users.route("/api/users/forgot-password", methods=['POST'])
def forgot_password_user():
    try:
        if "email" not in request.json:
            return jsonify({"message": "missing an 'email' keys in json"}), 400
        else:
            return forgot_password()
    except Exception:
        return jsonify({"message": "Internal server error"}), 500


@users.route("/api/users/forgot-password/<token>", methods=['PUT'])
def new_password_user(token):
    try:
        if "password" not in request.json:
            return jsonify({"message": "missing an 'password' keys in json"}), 400
        else:
            return new_password(token)
    except Exception:
        return jsonify({"message": "Internal server error"}), 500





@users.route('/api/users', methods=['GET'])
@jwt_required(refresh=True)
def index_user():
    user = get_jwt_identity()

    if request.method == 'GET':
        return jsonify(user)  

    
@users.route('/api/users', methods=['DELETE'])
@jwt_required(refresh=True)
def update_user():
    user = get_jwt_identity()

    if request.method == 'PUT':
        return jsonify(message="User updated"), 200
    
    if request.method == 'DELETE':
        return delete_user(user), 200