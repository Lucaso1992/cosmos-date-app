import React from 'react'
import { useNavigate } from "react-router-dom";

import { useAppContext } from '../../flux/AppContext'
import { recoverPassword } from '../../Services/recoverPassword'
import { deleteUser } from '../../Services/deleteUser'

import style from "./AccountSettings.module.css"
import { MdManageAccounts } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { BsShieldLockFill } from "react-icons/bs";

export const AccountSettings = () => {
  const value = useAppContext();

  const navigate = useNavigate()
  const userData = value.store.userData
  const token = value.store.token;
  const socket = value.store.socket

  const logOut = () =>{
    sessionStorage.removeItem("token");
    socket.disconnect();
    value.actions.setToken('');
    value.actions.setUserData({});
    navigate('/');
  }

  const changePassword = () =>{
    recoverPassword(userData.email)
    .then((resp)=>{
      if (resp){
        alert("Check your inbox for recovery your password.");
        sessionStorage.removeItem("token");
        socket.disconnect();
        value.actions.setToken('');
        value.actions.setUserData({});
        navigate('/');
      }
      else return
    });
  }

  const deleteUserFunction = () =>{
    deleteUser(token);
    sessionStorage.removeItem("token");
    value.actions.setToken('');
    value.actions.setUserData({});
    navigate('/');
  }

  return (
    
    <div className="dropdown">
      
      <a className={`${style.account_button} dropdown-toggle nav-link`} role="button" data-bs-toggle="dropdown">
        <MdManageAccounts className={style.account_icon}/>
        Account
      </a>

      <ul className={`${style.dropdown_list} dropdown-menu dropdown-menu-end`} id='dropdown_list'>
        <li>
          <a className={`${style.dropdown_item} dropdown-item`} role="button" onClick={logOut}>
            <BiLogOutCircle className={style.item_icon} />
            Log out
          </a>
        </li>
        <li>
          <a className={`${style.dropdown_item} dropdown-item`} role="button" onClick={changePassword}>
            <BsShieldLockFill className={style.item_icon} />
            Change password
          </a>
        </li>
        <li>
          <a className={`${style.dropdown_item} dropdown-item`} role="button" onClick={deleteUserFunction}>
            <HiOutlineTrash className={style.item_icon} />
            Delete user
          </a>
        </li>
      </ul>

    </div>
  )
}
