from flask import request, session
from utils.socket_io import socketio
from flask_socketio import emit, join_room, send, leave_room
import random

@socketio.on('connect')
def handle_connect():
  print("Connected")

@socketio.on('message')
def handle_message(mjsData):

  print(mjsData)
  emit("chat", mjsData, broadcast=True)



# def room():
#   user_name = request.json.get('user_name')
#   code_room = request.json.get('code_room')
#   user_id = request.json.get('user_id')

#   if request.method == 'POST':
#     new_code_room = random.randint(1000, 9999)
#     rooms[new_code_room] = {"members": 0, "messages": []}

#   elif request.method == 'GET':
#     pass

#   session['code_room'] = new_code_room
#   session['user_name'] = user_name
#   session['user_id'] = user_id
    


rooms = {}

@socketio.on('create_room')
def handle_join(userData):
  # user_name = userData['sendrer_name']
  code_room = userData['code_room']
  # user_id = userData['sender_id']

  # new_code_room = random.randint(1000, 9999)
  rooms[code_room] = {"members": 0, "messages": []}

  join_room(code_room)
  rooms[code_room]['members'] += 1

  # emit("chat_room", userData, broadcast=True)


@socketio.on('join_room')
def handle_join(userData):
  room = userData['room']

  # if code_room not in rooms:
  #   rooms[code_room] = {"members": 0, "messages": []}

  join_room(room)
  # rooms[code_room]['members'] += 1

  socketio.emit('room_joined', userData, room=room)
  send(userData, to=room)
  # rooms[code_room]["messages"].append(userData)

  print(userData, room)
  # emit("chat_room", userData, broadcast=True)


















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