from flask import Blueprint

from controllers.auth_controller import login_authentication


auth = Blueprint('auth',__name__)

@auth.route('/api/auth_login', methods=['POST'])
def login_auth():
    return login_authentication()