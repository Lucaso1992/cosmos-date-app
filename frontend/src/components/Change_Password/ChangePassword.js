import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { changePassword } from '../../Services/changePassword'

import style from "./ChangePassword.module.css"
import { BiSolidLock } from "react-icons/bi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [viewPassword, setViewPassword] = useState(false);

  const params = useParams();
  const navigate = useNavigate()

  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }
  const handlePasswordConfirm = (e) =>{
    setPasswordConfirm(e.target.value)
  }

  const handleviewPassword = ()=>{
    setViewPassword(!viewPassword)
  }


  const submitFuntion = async(e)=>{
    e.preventDefault();
    if(password!== passwordConfirm){
      alert('Passwords do not match!')
    }
    else{
      changePassword(params.token, password)
      .then((resp)=>{
        if (resp){
          navigate('/');
        }
        else return
      })
    }
  }


  return (
    <div className={style.port_view}>
      <div className={style.modal_content}>
        <div className={style.modal_body}>
          
          <h2>Change password</h2>
          
          <form onSubmit={submitFuntion}>

            <div className={style.input_box}>
              <span className={style.icon} onClick={handleviewPassword}>
                {viewPassword?<BsEyeFill />:<BsEyeSlashFill />}
              </span>
              <input type={viewPassword?'text':'password'} value={password} onChange={handlePassword} required/>
              <label>New Password:</label>
            </div>

            <div className={style.input_box}>
              <span className={style.icon}>
                <BiSolidLock />
              </span>
              <input type='password' value={passwordConfirm} onChange={handlePasswordConfirm} required/> 
              <label>Confirm Password:</label>
            </div>

            <button type='submit' className={style.submit_btn}>
              Save Password
            </button>
            
          </form>

        </div>
      </div>
    </div>
  )
}
