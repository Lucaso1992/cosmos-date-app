from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from controllers.match_controller import get_match


matches = Blueprint('matches',__name__)

@matches.route("/api/get_matches", methods=['GET'])
@jwt_required(refresh=True)
def handle_get_matches():
    user = get_jwt_identity()
    posible_match = get_match(user)
    
    return jsonify(posible_match), 200