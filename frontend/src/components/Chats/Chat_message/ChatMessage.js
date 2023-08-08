import { useState, useEffect, useRef } from 'react'

import { useAppContext } from '../../../flux/AppContext'

import style from "./ChatMessage.module.css"
import { MdSend } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";


export const ChatMessage = ({codeRoom, messages}) => {
  const [inputData, setInputData] = useState('');
  const value = useAppContext();
  const scrollableDivRef = useRef(null);

  const socket = value.store.socket
  const userData = value.store.userData


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputData === '' || codeRoom === '') return
    else {
      socket.emit('message', {
        'room': codeRoom,
        'message': inputData,
        'sender_id':userData.id,
        'sendrer_name':userData.user_name
      });
      setInputData('');
    }
  }



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
    <div className={style.chat_body}>
      {
        codeRoom?(
          <>
          <div className={style.chat_header}>
            <div className={style.img_div}>
              <img
                className={style.img}
                src='https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png' alt='' />
            </div>
            <span>Chat: {codeRoom}</span>
            <div className={style.icon_div}>
              <BiPhoneCall className={style.icon_header}/>
              <SlOptionsVertical className={style.icon_header}/>
            </div>
          </div>
          
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
          </>
        ):(
          <h5>None chat selected...</h5>
        )
      }
    </div>
  )
}
