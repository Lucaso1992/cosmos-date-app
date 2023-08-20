import { useState } from 'react';

import { useAppContext } from '../../flux/AppContext'
import { mapZodiacSign } from './utills/mapZodiacSign.js';
import { updateLikes } from "../../Services/updateLikes";
import { updateDislikes } from '../../Services/updateDislikes';

import style from "./Match.module.css";
import RingLoader from "react-spinners/RingLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { FaRegFaceTired } from 'react-icons/fa6';
import { BsFillArrowThroughHeartFill, BsPerson } from 'react-icons/bs';
import { RiHeartsFill } from 'react-icons/ri';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GiWorld } from 'react-icons/gi';

export const Match = () => {
  const [loading, setLoading] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const value = useAppContext();

  const token = value.store.token
  const matchData = value.store.matchData
  const setToken = value.actions.setToken
  const setMatchData = value.actions.setMatchData


  const handleLike = (status) => {
    setLoading(true)
    if (status === "like") {
      updateLikes(token, matchData.id, setToken, setMatchData)
      .then(() => setLoading(false))
    }
    else if (status === "dislike") {
      updateDislikes(token, matchData.id, setToken, setMatchData)
      .then(() => setLoading(false))
    }
    return
  }

  if (Object.keys(matchData).length === 0) {
    return (
      <div>
        <RingLoader
          color={"#fff"}
          size={140}
        />
      </div>
    )
  }

  return (
    <div className={style.general_div}>
      <div className={loading ? style.loading:style.hide_loding}>
        <ClipLoader
          color={"#fff"}
          size={100}
          speedMultiplier={0.7}
        />
      </div>

      <div className={`${style.about_me} ${moreInfo?'':style.hide}`}>
        <AiOutlineCloseCircle
          className={style.close_about_me}
          onClick={() => setMoreInfo(false)} />

        <h2 className={style.modal_zodiac_sign}>
          {mapZodiacSign[matchData.profile.zodiac_sign]}
        </h2>
        <h2>
          <strong>{matchData.user_name}</strong>, age: {matchData.profile.age}
        </h2>
        <p>Location: <strong>{matchData.profile.location}</strong></p>
        <p>Height: <strong>{matchData.profile.height} cm.</strong></p>
        <h2 className='mb-0'>About Me</h2>
        <p>
          {matchData.profile.description}
        </p>
      </div>

      <BsFillArrowThroughHeartFill
        className={style.icons_favorite}  
        type="button" 
        onClick={() => handleLike("like")}/>


      <div className={style.img_div}>
        <img className={style.img} src={matchData.profile.profile_image} alt=""/>
      </div>
      <div className={style.infocontainer_div}>
        <div className={style.first_infodiv}>
          <div className={style.name_zodiac_div}>

            <h2 className={style.user_name}>
              <BsPerson className={style.icons_location}/>
              <strong>{matchData.user_name}</strong>, {matchData.profile.age}
            </h2>
            <p className={style.user_distance}>
              <GiWorld className={style.icons_location}/>
              {matchData.profile.location}
            </p>
          </div>
          <div className={style.symbol_div}>
            <div className={style.symbol}>
              {mapZodiacSign[matchData.profile.zodiac_sign]}
            </div>
            <p className={style.sign}>
              {matchData.profile.zodiac_sign}
            </p>
          </div>
        </div>

        <div className={style.interactive_div}>
          <div className={style.icons_div}>
              <FaRegFaceTired 
                className={style.icons_dislike_div} 
                type="button" 
                onClick={() => handleLike("dislike")} />
              <RiHeartsFill 
                className={style.icons_like_div} 
                type="button" 
                onClick={() => handleLike("like")} />
          </div>
          <div className={style.button_div}>
            <button type="button" className={style.modal_button} onClick={() => setMoreInfo(true)}>
              About Me
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};



