import { useState, useEffect } from 'react'

import { useAppContext } from '../../flux/AppContext'
import { ChatList } from './Chat_list/ChatList';
import { ChatMessage } from './Chat_message/ChatMessage';
import { getChatsUser } from '../../Services/getChatsUser'


import style from "./Chats.module.css"
import { AiOutlineClose } from "react-icons/ai";
import { PiWechatLogoFill } from "react-icons/pi";



export const Chats = () => {
  const [visibility, setVisibility] = useState(false);
  const [chats, setChats] = useState([]);
  const [codeRoom, setCodeRoom] = useState('');
  const [chatName, setChatName] = useState('');
  const [messages, setMessages] = useState([]);
  const value = useAppContext();

  const socket = value.store.socket
  const token = value.store.token
  // const userData = value.store.userData
  
  const changeVisibility = () => {
    setVisibility(!visibility);
    getChatsUser(token, setChats);
  }



  useEffect(() => {
    if (socket){
      socket.on('room_joined', (data) => {
        setCodeRoom(data.room);
        setChatName(data.receiver_name);
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
                rooms={chats} 
                setRooms={setChats}
                codeRoom={codeRoom}
                setCodeRoom={setCodeRoom}
                setMessages={setMessages} />

              <ChatMessage
                codeRoom={codeRoom}
                chatName={chatName}
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