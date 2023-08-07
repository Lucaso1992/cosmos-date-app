from flask import request
from utils.socket_io import socketio
from flask_socketio import emit, join_room, leave_room
import random

@socketio.on('connect')
def handle_connect():
  print("Connected")


rooms = {}

@socketio.on('create_room')
def handle_create(userData):
  if userData['room'] in rooms:
    leave_room(userData['room'])

  room = str(random.randint(1000, 9999))
  rooms[room] = {"members": 1, "messages": []}

  join_room(room)
  userData['room'] = room

  emit("room_created", {"room": room, "messages": []}, room=room)


@socketio.on('join_room')
def handle_join(userData):
  room = userData['room']

  if room not in rooms:
    return print("Room not found")
  else:
    join_room(room)
    rooms[room]['members'] += 1
    messages = rooms[room]["messages"]

    emit('room_joined', {"room": room, "messages": messages}, room=room)


@socketio.on('message')
def handle_message(userData):
  room = userData['room']
  if room is None:
    return
  elif room not in rooms:
    return print("Room not found")
  else:
    rooms[room]["messages"].append(userData)
    message = rooms[room]["messages"]
    
    socketio.emit('chat_message', message, room=room)
  # send(userData, to=room)


@socketio.on('leave_room')
def handle_leave(userData):
  room = userData['room']

  if room not in rooms:
    return print("Room not found")
  else:
    leave_room(room)
    rooms[room]['members'] -= 1

    if rooms[room]['members'] == 0:
      del rooms[room]


















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