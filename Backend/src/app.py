import os
from dotenv import load_dotenv
from flask import Flask, send_from_directory
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate

from utils.db import db
from utils.mail import mail
from controllers.socket_io_controller import socketio
from models.user_chat import User_chat
from routes.api import api



# static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', 'front-end', 'build')

app = Flask(__name__) #, static_folder=static_file_dir
CORS(app)
load_dotenv()

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = "datingstars23@gmail.com"
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True


app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')

mail.init_app(app)
db.init_app(app)
socketio.init_app(app, cors_allowed_origins='*')

migrate = Migrate(app, db)

app.register_blueprint(api)



# @app.route('/')
# @app.route('/<path:path>', methods=['GET'])
# def serve_any_other_file(path='index.html'):
#     response = send_from_directory(static_file_dir, path)
#     return response

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    socketio.run(app, debug=True)