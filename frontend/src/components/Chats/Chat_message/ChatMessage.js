import { useState, useEffect, useRef } from 'react'

import { useAppContext } from '../../../flux/AppContext'

import style from "./ChatMessage.module.css"
import { MdSend } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";


export const ChatMessage = ({codeRoom, chatName, chatPhoto, messages}) => {
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
        'sender_id': userData.id,
        'sender_name': userData.user_name
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
                src={chatPhoto} alt='' />
            </div>
            <span>{chatName}</span>
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
                  userData.id===message.user_id?
                  style.chat_sender:
                  style.chat_recived}
                  key={i}>
                  <p
                    className={
                    userData.id===message.user_id?
                    style.sender_name:
                    style.recived_name}>
                    {message.user_name}:
                  </p>
                  {message.text}
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
