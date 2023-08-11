import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { useAppContext } from '../../flux/AppContext'
import { recoverPassword } from '../../Services/recoverPassword'
import { deleteUser } from '../../Services/deleteUser'
import { ConfirmModal } from './ConfirmModal/ConfirmModal';

import style from "./AccountSettings.module.css"
import { MdManageAccounts } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { BsFillHeartbreakFill, BsShieldLockFill, BsPersonFillLock } from "react-icons/bs";


export const AccountSettings = () => {
  const [showLogout, setShowLogOut] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
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

  const deleteUserFunc = () =>{
    deleteUser(token);
    sessionStorage.removeItem("token");
    socket.disconnect();
    value.actions.setToken('');
    value.actions.setUserData({});
    setShowDelete(false);
    navigate('/');
  }

  return (
    <>
    <div className="dropdown">
      
      <button
        className={`${style.account_button} dropdown-toggle nav-link`} 
        data-bs-toggle="dropdown">
        <MdManageAccounts className={style.account_icon}/>
        Account
      </button>

      <ul className={`${style.dropdown_list} dropdown-menu dropdown-menu-end`} id='dropdown_list'>
        <li>
          <button 
            className={`${style.dropdown_item} dropdown-item`} 
            onClick={()=>setShowLogOut(!showLogout)}>
            <BiLogOutCircle className={style.item_icon} />
            Log out
          </button>
        </li>
        <li>
          <button 
            className={`${style.dropdown_item} dropdown-item`} 
            onClick={()=>setShowChangePassword(!showChangePassword)}>
            <BsShieldLockFill className={style.item_icon} />
            Change password
          </button>
        </li>
        <li>
          <button 
            className={`${style.dropdown_item} dropdown-item`}  
            onClick={()=>setShowDelete(!showDelete)}>
            <HiOutlineTrash className={style.item_icon} />
            Delete user
          </button>
        </li>
      </ul>


    </div>
    {
      showLogout?
      <ConfirmModal 
        showModal={()=>setShowLogOut(!showLogout)}
        modalFunction={logOut}
        titleText="Log Out"
        textModal="Are you sure you want to log out? Come soon, we will miss you!"
        iconText={<FaRegFaceSadTear />}
        greenTextBtn="Cancel"
        redTextBtn="Log Out"/>
      :''
    }
    {
      showChangePassword?
      <ConfirmModal 
        showModal={()=>setShowChangePassword(!showChangePassword)}
        modalFunction={changePassword}
        titleText="Change Password"
        textModal="Are you sure you want to change your password?"
        iconText={<BsPersonFillLock />}
        greenTextBtn="Cancel"
        redTextBtn="Confirm"/>
      :''
    }
    {
      showDelete?
      <ConfirmModal 
        showModal={()=>setShowDelete(!showDelete)}
        modalFunction={deleteUserFunc}
        titleText="Delete Account"
        textModal="Are you sure you want to delete your account?"
        iconText={<BsFillHeartbreakFill />}
        greenTextBtn="Cancel"
        redTextBtn="Delete"/>
      :''
    }
    </>
  )
}
