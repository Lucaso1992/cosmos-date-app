from flask import jsonify, request
from utils.socket_io import socketio
from flask_socketio import emit, join_room, leave_room
import random

from utils.db import db
from models.chats import Chat
from models.users import User
from models.messages import Message
from models.user_chat import User_chat


def get_chats(userData):
  user_db = User.query.get(userData['id'])
  user_chats = User_chat.query.filter_by(user_id=user_db.id).all()
  chats = []

  for chat in user_chats:
    messages_db = Message.query.filter_by(chat_id=chat.chat_id).all()
    messages = []
    for message in messages_db:
      messages.append(message.serialize())
    
    users_chat_db = User_chat.query.filter_by(chat_id=chat.chat_id).all()
    for user in users_chat_db:
      if user.user_id != user_db.id:
        reciverUserName = User.query.get(user.user_id).user_name

    chats.append({
      "chat": chat.chat_id, 
      "messages": messages, 
      "user_name": reciverUserName
      })

  return jsonify(chats)



# @socketio.on('create_room')
# def handle_create(userData):
#   user_db = User.query.get(userData['sender_id'])
#   user_chats = userData["chats"]
#   user_chats_db = []

#   for chat_id in user_chats:
#       user_chat = Chat.query.get(chat_id)
#       if user_chat:
#           user_chats_db.append(user_chat)
  
#   new_chat = Chat()
#   db.session.add(new_chat)

#   user_chats_db.append(new_chat)
#   user_db.chats = user_chats_db
  
#   db.session.commit()
#   join_room(new_chat.id)

#   emit("room_created", {"room": new_chat.id, "messages": []}, room=new_chat.id)



@socketio.on('join_room')
def handle_join(userData):
  # user_db = User.query.get(userData['sender_id'])
  chat_db = Chat.query.get(userData['room'])

  if chat_db is None:
    return jsonify({"message": "Chat not found in database"})
  else:
    join_room(chat_db.id)

    messages_db = Message.query.filter_by(chat_id=chat_db.id).all()
    messages = []

    for message in messages_db:
      messages.append(message.serialize())

    emit('room_joined', {
        "room": chat_db.id, 
        "messages": messages, 
        "receiver_name":userData['receiver_name']
      }, room=chat_db.id)



# @socketio.on('join_room')
# def handle_join(userData):
#   user_db = User.query.get(userData['sender_id'])
#   chat_db = Chat.query.get(userData['room'])
#   user_chats = userData["chats"]
#   user_chats_db = []

#   if chat_db is None:
#     return jsonify({"message": "Chat not found in database"})
#   else:
#     for chat_id in user_chats:
#       user_chat = Chat.query.get(chat_id)
#       if user_chat:
#           user_chats_db.append(user_chat)
      
#     user_chats_db.append(chat_db)
#     user_db.chats = user_chats_db

#     db.session.commit()
#     join_room(chat_db.id)

#     messages_db = Message.query.filter_by(chat_id=chat_db.id).all()
#     messages = []

#     for message in messages_db:
#       messages.append(message.serialize())

#     emit('room_joined', {"room": chat_db.id, "messages": messages}, room=chat_db.id)


@socketio.on('message')
def handle_message(userData):
  user_db = User.query.get(userData['sender_id'])
  chat_db = Chat.query.get(userData['room']) 

  if chat_db is None:
    print("Chat not found")
    return jsonify({"message": "Chat not found in database"})
  else:
    new_message = Message(
      chat_id = chat_db.id,
      user_id = user_db.id,
      user_name = user_db.user_name,
      text = userData['message']
    )
    db.session.add(new_message)
    db.session.commit()

    messages_db = Message.query.filter_by(chat_id=chat_db.id).all()
    messages = []

    for message in messages_db:
      messages.append(message.serialize())

    emit('chat_message', messages, room=chat_db.id)



@socketio.on('leave_room')
def handle_leave(userData):
  user_db = User.query.get(userData['sender_id'])
  chat_db = Chat.query.get(userData['room']) 

  if chat_db is None:
    return jsonify({"message": "Chat not found in database"}), 404
  else:
    leave_room(chat_db.id)

    user_chat = User_chat.query.filter(
        User_chat.chat_id==chat_db.id, 
        User_chat.user_id==user_db.id
      ).first()
    db.session.delete(User_chat.query.get(user_chat.id))

    users_chat = User_chat.query.filter_by(chat_id=chat_db.id).all()
    if len(users_chat)==0:   
      db.session.delete(Chat.query.get(chat_db.id))

    db.session.commit()



















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