from flask import Blueprint

from .users import users
from .auth import auth
from .activate_account import activeAccount


api = Blueprint('api',__name__)

api.register_blueprint(users)
api.register_blueprint(auth)
api.register_blueprint(activeAccount)