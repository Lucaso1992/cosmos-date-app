import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

import { getUserData } from '../Services/getUserData';
import { getMatch } from '../Services/getMatch';

const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [socket, setSocket] = useState(null);
  const [matchData, setMatchData] = useState({});


  useEffect(()=>{ 
    const localToken = sessionStorage.getItem("token");
    if (localToken && localToken!==undefined && localToken!==""){
      getUserData(localToken, setUserData);
      setToken(localToken);
      setLogin(true)
      return
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

  
  useEffect(() => {
    if (token !== undefined && token !== "" && userData.profile!==undefined){
      if ( Object.keys(userData.profile).length>0 && Object.keys(matchData).length===0){
        getMatch(token, setMatchData);
      }
      return
    } 
    else return
  }, [token, userData, matchData])



  const store = useMemo(()=>{
    return  {token, userData, login, socket, matchData}
  },[token, userData, login, socket, matchData]);

  const actions = {
    setToken,
    setUserData,
    setMatchData
  }

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);