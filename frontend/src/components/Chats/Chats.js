import { useState, useEffect } from 'react'

import { useAppContext } from '../../flux/AppContext'

import style from "./Chats.module.css"
import { AiOutlineClose } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import { PiWechatLogoFill } from "react-icons/pi";

export const Chats = () => {
  const [visibility, setVisibility] = useState(false);
  const [inputData, setInputData] = useState('');
  const [messages, setMessages] = useState([]);
  const value = useAppContext();

  const socket = value.store.socket

  
  const changeVisibility = () => {
    setVisibility(!visibility);
  }
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  }
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', inputData); 
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
              <ul className={style.chat_message}>
                {
                  messages.map((message, i) => (
                    <div key={i}>
                      <p className={style.chat_sender}>{message.sender}:</p>
                      <li className={style.chat_text}>
                        {message.message}
                      </li>
                    </div>
                  ))
                }
              </ul>

              <form className={style.chat_footer} onSubmit={handleSendMessage}>
                <input type="text" className={style.input} value={inputData} onChange={handleInputChange}/>
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