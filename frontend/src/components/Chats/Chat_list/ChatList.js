import { useState } from 'react';

import { useAppContext } from '../../../flux/AppContext'

import style from "./ChatList.module.css"
import { BiSearchAlt } from "react-icons/bi";
import { BsFillTrash2Fill } from "react-icons/bs";

export const ChatList = ({rooms, setRooms, codeRoom, setCodeRoom, setMessages}) => {
  const [inputRoom, setInputRoom] = useState('');
  const value = useAppContext();

  const socket = value.store.socket
  const userData = value.store.userData


  const handleCreateChat = () => {
    socket.emit('create_room', {
      'sender_id':userData.id,
      'sendrer_name':userData.user_name,
      'room': codeRoom
    });
  }

  const handleJoinChat = (room) => {
    setCodeRoom(room);
    setInputRoom('');
    socket.emit('join_room', {
      'room': room,
      'sender_id':userData.id,
      'sendrer_name':userData.user_name
    });
  }

  const handleSwitchRoom = (room) => {
    setCodeRoom(room);
    handleJoinChat(room);
  }

  const handleLeaveChat = (room) => {
    socket.emit('leave_room', {
      'room': room,
      'sender_id':userData.id,
      'sendrer_name':userData.user_name
    });
    setCodeRoom('');
    setMessages([]);
    setRooms(prev =>{
      return prev.filter(item => item !== room)
    })
  }




  return (
    <div className={style.chats_list}>
      <h5>Chats List</h5>

      <form>
        <div className={style.find_chat}>
          <input 
            type='text' 
            className={style.find_chat_input} 
            value={inputRoom} 
            onChange={(e)=>setInputRoom(e.target.value)}/>
          <button type='button' className={style.find_chat_btn} onClick={()=> handleJoinChat(inputRoom)}>
            <BiSearchAlt />
          </button>
        </div>

        <button type='button' className={style.new_chat_btn} onClick={handleCreateChat}>
          Create Room
        </button>
      </form>

      <div className={style.room_container} >
        {
          rooms.map((room, i) => (
            <div key={i} className={style.room_div}>
              <div className={style.img_div}>
                <img
                  className={style.img}
                  src='https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png' alt='' />
              </div>
              <span className={style.room_name} onClick={()=>handleSwitchRoom(room)}>
                {room}
              </span>
              <BsFillTrash2Fill className={style.trash_icon} onClick={()=>handleLeaveChat(room)}/>
            </div>
          ))
        } 
      </div>
    </div>
  )
}
