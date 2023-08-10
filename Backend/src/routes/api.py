from flask import Blueprint

from .users import users
from .auth import auth
from .chats import chats


api = Blueprint('api',__name__)

api.register_blueprint(users)
api.register_blueprint(auth)
api.register_blueprint(chats)