from flask import request
from utils.socket_io import socketio
from flask_socketio import emit

@socketio.on('connect')
def handle_connect():
  print("Connected")

@socketio.on('message')
def handle_message(mjsData):
  
  print(mjsData)
  emit("chat", mjsData, broadcast=True)



















# from flask import jsonify, request

# from models.chats import Chat
# from models.users import User
# from utils.db import db


# def create_chat(user):
#     user_db = User.query.get(user["id"])
#     new_chat = Chat()



# def update_chats(user):
#     user_chats = request.json.get('user_chats')
#     user_db = User.query.get(user["id"])
    
#     chats_db = []

#     for chat_id in user_chats:
#         existing_chat = Chat.query.get(chat_id)
#         if existing_chat:
#             chats_db.append(existing_chat)

#     user_db.chats = chats_db
#     db.session.commit()

#     return user_db.serialize_with_chats()