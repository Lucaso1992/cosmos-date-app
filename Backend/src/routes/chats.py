from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from controllers.socket_io_controller import get_chats


chats = Blueprint('chats',__name__)

@chats.route("/api/chats", methods=['GET'])
@jwt_required(refresh=True)
def handle_get_chats():
    user = get_jwt_identity()

    if user is None:
        return jsonify({"message": "User not found"}), 400
    else:
        return get_chats(user), 200