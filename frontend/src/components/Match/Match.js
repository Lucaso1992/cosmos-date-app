import { useEffect, useState } from 'react';

import  user_Matches  from "./../../flux/DataProvisional.js";
import MatchAlert from "./Alert/MatchAlert.js";

import style from "./Match.module.css";
import { AiFillLike, AiFillDislike, AiOutlineStar } from 'react-icons/ai';


export const Match = () => {
  const [matchIndex, setMatchIndex] = useState(0);
  const [matchData, setMatchData] = useState({});
  const [usersList, setUsersList] = useState([]);

  useEffect(()=>{
    setUsersList(user_Matches);
  },[])

  useEffect(()=>{
    if (!usersList.length) return;
    setMatchData(usersList[matchIndex])
  },[matchIndex, usersList])
  
  const handleIndex = () => {
    setMatchIndex((prevIndex) => {
      let index = prevIndex + 1;
      return index > usersList.length ? index = 0 : index;
    });
  }
  if (!matchData) {
    return <div className={style.alert_div}>
      <MatchAlert/>
      </div>
  }
  
  return (
    <div className={style.match_container}>
      <div className={style.match_card}>
        <div className={`${style.img_div} col-md-4`}>
          <img className={style.img_card} src={matchData.imageName} alt=''/>
        </div>
        <div className="d-flex flex-column">
          <div className={style.first_div}>
            <h2 className="card-title ms-4">{matchData.user_name}, {matchData.user_age}</h2>
            <p className="card-text mb-0 ms-4">{matchData.user_city}</p>
            <p className="card-text ms-4"><small className="text-body-secondary">{matchData.user_distance}</small></p>
          </div>
          <div className={style.second_div}>
            <h5 className="ms-4">ASTROLOGICAL DATA</h5>
            <p className="ms-4">{matchData.astro_data}</p>
            <h5 className="ms-4">GENERAL INFORMATION</h5>
            <p className="ms-4">{matchData.general_information}</p>
          </div>
          <div className={style.third_div}>
            <AiFillLike />
            <AiFillDislike />
            <AiOutlineStar />
            <button type="button" onClick={handleIndex} className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};



