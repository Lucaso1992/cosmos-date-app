import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

import { getUserData } from '../Services/getUserData';

const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [socket, setSocket] = useState(null);


  useEffect(()=>{ 
    const localToken = sessionStorage.getItem("token");
    if (localToken && localToken!==undefined && localToken!==""){
      getUserData(localToken, setUserData);
      setToken(localToken);
      return
    }
  },[token])

  useEffect(()=>{
    if (token && token!==undefined && token!==""){
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  },[token])

  useEffect(()=>{
    if (login){
      setSocket(io(process.env.REACT_APP_API_URL))
    }
  },[login])



  const store = useMemo(()=>{
    return  {token, userData, login,socket}
  },[token, userData, login,socket]);

  const actions = {
    setToken,
    setUserData
  }

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);