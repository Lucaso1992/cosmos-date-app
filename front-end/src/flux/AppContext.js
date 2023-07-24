import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getUserData } from '../Services/getUserData'


const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});


  useEffect(()=>{ 
    const localToken = sessionStorage.getItem("token");
    if (localToken && localToken!==undefined && localToken!==""){
      getUserData(localToken, setUserData);
      setToken(localToken);
      return
    }
  },[token])


  const store = useMemo(()=>{
    return  {token, userData}
  },[token, userData]);

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
