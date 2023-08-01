import { useState } from 'react'

import { recoverPassword } from '../../Services/recoverPassword'

import style from "./ForgotPassword.module.css"
import { IoIosMail } from "react-icons/io";


export const ForgotPassword = ({handle_ForgotMode}) => {
  const [email, setEmail] = useState('');


  const handleEmailInput = (e) =>{
    setEmail(e.target.value)
  }

  const submitFuntion = async(e)=>{
    e.preventDefault();

    recoverPassword(email)
    .then((resp)=>{
      if (resp){
        setEmail('');
        alert("Check your inbox for recovery your password.");
      }
      else return
    });
  }

  return (
    <>
      <h2>Recovery</h2>
      <h2>Password</h2>
      
      <form className={style.form} onSubmit={submitFuntion}>

        <div className={style.input_box}>
          <span className={style.icon}>
            <IoIosMail />
          </span>
          <input type='email' value={email} onChange={handleEmailInput} required/>
          <label>Email:</label>
        </div>

        <button type='submit' className={style.submit_btn}>
          Send me an Email
        </button>
        
        <div className={style.singIn_register}>
          <p>
            Don't have an account?
            <button type='button' className={style.register_link} onClick={handle_ForgotMode}>
              Sing in
            </button>
          </p>
        </div>
        
      </form>
    </>
  )
}
