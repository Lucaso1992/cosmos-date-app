import { useState, useEffect, useRef } from 'react'

import { useAppContext } from '../../flux/AppContext'

import style from "./Chats.module.css"
import { AiOutlineClose } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import { PiWechatLogoFill } from "react-icons/pi";

export const Chats = () => {
  const [visibility, setVisibility] = useState(false);
  const [inputData, setInputData] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollableDivRef = useRef(null);
  const value = useAppContext();

  const socket = value.store.socket
  const userData = value.store.userData

  
  const changeVisibility = () => {
    setVisibility(!visibility);
  }
  
  

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', {'message': inputData, 'sender_id':userData.id, 'sendrer_name':userData.user_name}); 
    setInputData('');
  }
  const recivedMessage = (data) => {
    setMessages(prev => [...prev, data]);
  }
  useEffect(() => {
    if (socket){
      socket.on('chat', recivedMessage);
    }
  }, [socket]);
  
  
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: scrollableDiv.scrollHeight,
        behavior: 'smooth',
      });
    }
  }



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

            <div className={style.chat_body}>
              <ul className={style.chat_message} ref={scrollableDivRef}>
                {
                  messages.map((message, i) => (
                    <li
                      className={
                      userData.user_name===message.sendrer_name?
                      style.chat_sender:
                      style.chat_recived}
                      key={i}>
                      <p
                        className={
                        userData.user_name===message.sendrer_name?
                        style.sender_name:
                        style.recived_name}>
                        {message.sendrer_name}:
                      </p>
                      {message.message}
                    </li>
                  ))
                }
              </ul>

              <form className={style.chat_footer} onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  className={style.input} 
                  value={inputData} 
                  onChange={(e)=>setInputData(e.target.value)}/>
                <button type="submit" className={style.send_btn} >
                  <MdSend />
                </button>
              </form>
            </div>
          </div>

        </div>
        

        <button className={visibility? style.hide : style.chat_btn} type='button' onClick={changeVisibility}>
          <PiWechatLogoFill />
        </button>
        </>
      ):('')
    }
    </>
  )
}