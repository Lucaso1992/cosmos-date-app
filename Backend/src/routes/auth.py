from flask import Blueprint
from flask import request, jsonify

from controllers.auth_controller import login_authentication


auth = Blueprint('auth',__name__)

@auth.route('/api/login', methods=['POST'])
def login_auth():
    if "email" not in request.json or "password" not in request.json:
        return {"message": "missing an 'email' or 'password' keys in json"}, 400
    else:
        return login_authentication()