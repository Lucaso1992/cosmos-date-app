import os
from dotenv import load_dotenv
from flask import Flask
from flask_jwt_extended import JWTManager

from utils.db import db
from routes.api import api


app = Flask(__name__)

load_dotenv()

app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')

db.init_app(app)

app.register_blueprint(api)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)