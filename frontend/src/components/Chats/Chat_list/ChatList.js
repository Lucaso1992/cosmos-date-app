import { useState } from 'react';

import { useAppContext } from '../../../flux/AppContext'
import { ConfirmModal } from '../Confirm_Modal/ConfirmModal';

import style from "./ChatList.module.css"
import { BiSearchAlt } from "react-icons/bi";
import { BsFillTrash2Fill } from "react-icons/bs";
import { IoSadOutline } from "react-icons/io5";

export const ChatList = ({rooms, setRooms, setCodeRoom, setMessages, setShowChats}) => {
  const [showDelete, setShowDelete] = useState(false)
  const [chat, setChat] = useState('');
  const [inputRoom, setInputRoom] = useState('');
  const value = useAppContext();

  const socket = value.store.socket
  const userData = value.store.userData


  const handleSwitchRoom = (chat_data) => {
    setCodeRoom(chat_data.chat);
    setShowChats(false);
    socket.emit('join_room', {
      'room': chat_data.chat,
      'receiver_name': chat_data.user_name,
      'sender_id':userData.id,
      'sender_name':userData.user_name
    });
  }

  const handleShowDelete = (chat_id) => {
    setShowDelete(!showDelete)
    setChat(chat_id)
  }

  const handleDeleteMatch = () => {
    socket.emit('leave_room', {
      'room': chat,
      'sender_id':userData.id,
      'sender_name':userData.user_name
    });
    setCodeRoom('');
    setMessages([]);
    setRooms(prev =>{
      return prev.filter(item => item.chat !== chat)
    })
    setShowDelete(!showDelete)
  }




  return (
    <div className={style.chats_list}>
      <h5>Match List</h5>

      <form>
        <div className={style.find_chat}>
          <input 
            type='text' 
            className={style.find_chat_input} 
            value={inputRoom} 
            onChange={(e)=>setInputRoom(e.target.value)}/>
          <button type='button' className={style.find_chat_btn} >
            <BiSearchAlt />
          </button>
        </div>
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
                {room.user_name}
              </span>
              <BsFillTrash2Fill className={style.trash_icon} onClick={()=>handleShowDelete(room.chat)}/>

            </div>
          ))
        } 
      </div>
      {
        showDelete?
        <ConfirmModal
          showModal={()=>setShowDelete(!showDelete)}
          modalFunction={handleDeleteMatch}
          titleText="Delete Match"
          textModal="Are you sure you want to delete this match?"
          iconText={<IoSadOutline />}
          greenTextBtn="Cancel"
          redTextBtn="Delete"/>
        :''
      }
    </div>
  )
}
