import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

import { useAppContext } from '../../flux/AppContext'
import { getAutentication } from '../../Services/getAutentication'
import { createUser } from '../../Services/createUser'
import { ForgotPassword } from '../Forgot_Password/ForgotPassword';

import style from "./Login.module.css"
import { IoIosMail } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidLock, BiSolidUser } from "react-icons/bi";


export const Login = () => {
  const value = useAppContext();
  const [loginMode, setLoginMode] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const navigate = useNavigate()
  const token = value.store.token;


  const changeLoginForm = () => {
    setLoginMode(!loginMode);
  }
  const changeForgetMode = () => {
    setForgotPassword(!forgotPassword);
    setLoginMode(false);
  }

  const handleEmailInput = (e) =>{
    setEmail(e.target.value)
  }
  const handlePasswordInput = (e) =>{
    setPassword(e.target.value)
  }
  const handleUserNameInput = (e) =>{
    setUserName(e.target.value)
  }

  const resetModal = () =>{
    setLoginMode(true);
    setForgotPassword(false);
    setEmail('');
    setPassword('');
    setUserName('');
  }


  const submitFuntion = async(e)=>{
    e.preventDefault();

    if (loginMode===true){
      getAutentication(email, password, value.actions.setToken)
      .then((resp)=>{
        if (resp){
          navigate('/Home');
          setPassword('');
        }
        else return
      });
    }
    else {
      createUser(userName, email, password)
      .then((resp)=>{
        if (resp){
          resetModal();
          alert("Check your inbox for verify your email address.");
        }
        else return
      })
    }
  }


  return (
    <div className='modal fade' id={`loginModal`} data-bs-backdrop="static">
      <div className='modal-dialog modal-dialog-centered justify-content-center'>
        <div className={`${style.modal_content} modal-content`}>

          <div className={`col-12`}>
            <button className={style.icon_close} type='button' onClick={resetModal} data-bs-dismiss="modal">
              <AiOutlineClose />
            </button>

            <div className={style.modal_body}>
              {
                forgotPassword?
                (
                  <ForgotPassword handle_ForgotMode={changeForgetMode}/>
                ):(
                  token && token!=="" && token!==undefined ?
                  (
                    <>
                      <h2>Welcome,</h2>
                      <h2>{value.store.userData.user_name}!</h2>
                    </>
                  ):(
                    <>
                    <h2>{loginMode?'Login':'Sing In'}</h2>
                    
                    <form onSubmit={submitFuntion}>

                    {loginMode?
                      '':
                      <div className={style.input_box}>
                        <span className={style.icon}>
                          <BiSolidUser />
                        </span>
                        <input type='text' value={userName} onChange={handleUserNameInput} required/> 
                        <label>Username:</label>
                      </div>
                    }

                      <div className={style.input_box}>
                        <span className={style.icon}>
                          <IoIosMail />
                        </span>
                        <input type='email' value={email} onChange={handleEmailInput} required/>
                        <label>Email:</label>
                      </div>

                      <div className={style.input_box}>
                        <span className={style.icon}>
                          <BiSolidLock />
                        </span>
                        <input type='password' value={password} onChange={handlePasswordInput} required/> 
                        <label>Password:</label>
                      </div>

                      <div className={style.remember_forgot}>
                        <label>
                          <input type='checkbox' />
                          {loginMode?'Remember me':'I agreed to the terms & conditions'}
                        </label>
                        {loginMode?
                          (
                            <Link className={style.forgot_link} onClick={changeForgetMode}>
                              Forgot Password?
                            </Link>
                          ):''
                        }
                      </div>

                      <button type='submit' className={style.submit_btn}>
                        {loginMode?'Login':'Register'}
                      </button>
                      
                      <div className={style.login_register}>
                        <p>
                          {loginMode?"Don't have an account?":"You already have an account?"}
                          <button type='button' className={style.register_link} onClick={changeLoginForm}>
                            {loginMode?'Sing in':'Login'}
                          </button>
                        </p>
                      </div>
                    </form>
                    </>
                  )
                )
              }

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
