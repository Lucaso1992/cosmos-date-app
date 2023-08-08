import { useState, useEffect } from 'react'

import { useAppContext } from '../../flux/AppContext'
import { ChatList } from './Chat_list/ChatList';
import { ChatMessage } from './Chat_message/ChatMessage';


import style from "./Chats.module.css"
import { AiOutlineClose } from "react-icons/ai";
import { PiWechatLogoFill } from "react-icons/pi";



export const Chats = () => {
  const [visibility, setVisibility] = useState(false);
  const [codeRoom, setCodeRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const value = useAppContext();

  const socket = value.store.socket
  const userData = value.store.userData
  
  const changeVisibility = () => {
    setVisibility(!visibility);
    socket.emit('get_chats', {
      'sender_id':userData.id,
      'sender_name':userData.user_name
    });
  }

  



  useEffect(() => {
    if (socket){
      socket.on('got_chats', (data) => {
        setRooms(data)
      });
      socket.on('room_created', (data) => {
        setRooms(prev =>{
          if (prev.includes(data.room)) return prev;
          else return [...prev, data.room]
        });
        setCodeRoom(data.room);
        setMessages(data.messages);
      });
      socket.on('room_joined', (data) => {
        setRooms(prev =>{
          if (prev.includes(data.room)) return prev;
          else return [...prev, data.room]
        });
        setCodeRoom(data.room);
        setMessages(data.messages);
      });
      socket.on('chat_message', setMessages);
    }
  }, [socket]);



  return (
    <>
    {
      value.store.token?
      (
        <>
        <div className={`${visibility ? style.chat_view : style.hide} container`}>

          <div className={style.chat_container}>
            <button className={style.icon_close} type='button' onClick={changeVisibility}>
              <AiOutlineClose />
            </button>

            <h1>Chats</h1>
            <div className={style.body_container}>
              <ChatList
                rooms={rooms} 
                setRooms={setRooms}
                codeRoom={codeRoom}
                setCodeRoom={setCodeRoom}
                setMessages={setMessages} />

              <ChatMessage
                codeRoom={codeRoom}
                messages={messages}/>
            </div>
          </div>

        </div>
        

        <button 
          className={visibility? style.hide : style.chat_btn}
          type='button' 
          onClick={changeVisibility}>
          <PiWechatLogoFill />
        </button>
        </>
      ):('')
    }
    </>
  )
}