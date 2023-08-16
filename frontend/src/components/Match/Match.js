import { useEffect, useState } from 'react';

import { useAppContext } from '../../flux/AppContext'
import { mapZodiacSign } from './utills/mapZodiacSign.js';
import { getMatch } from '../../Services/getMatch';
import { updateLikes } from "../../Services/updateLikes";
import { updateDislikes } from '../../Services/updateDislikes';

import style from "./Match.module.css";
import RingLoader from "react-spinners/RingLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { FaRegFaceTired } from 'react-icons/fa6';
import { BsFillArrowThroughHeartFill } from 'react-icons/bs';
import { RiHeartsFill } from 'react-icons/ri';

export const Match = () => {
  const [loading, setLoading] = useState(false);
  const [matchData, setMatchData] = useState({});
  const value = useAppContext();

  const token = value.store.token
  const setToken = value.actions.setToken
  

  useEffect(() => {
    if (token !== undefined && token !== "" && Object.keys(matchData).length === 0) {
      getMatch(token, setMatchData)
    }
    else return
  }, [token, matchData])


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
      <div className={loading ? style.loading:style.hide}>
        <ClipLoader
          color={"#fff"}
          size={100}
          speedMultiplier={0.7}
        />
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
              <strong>{matchData.user_name}</strong>, {matchData.profile.age}
            </h2>
            <p className={style.user_distance}>
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
            <button type="button" className={style.modal_button} data-bs-toggle="modal" data-bs-target="#exampleModal">
              More Info
            </button>
          </div>
        </div>
      </div>

      
      <div className={`${ style.modal_div} modal fade`} id="exampleModal" tabIndex="-1">
        <div className={`${style.modal_last} modal-dialog`}>
            <div className="modal-content">

              <div className="modal-header">
                <div className="d-flex flex-column">
                  <h1 className="modal-title fs-1" id="exampleModalLabel">
                    <strong>{matchData.user_name}</strong>, {matchData.profile.age}
                  </h1>
                  <p className="card-text">
                    {matchData.profile.location}
                  </p>
                </div>
                <button type="button" className="btn-close mb-auto" data-bs-dismiss="modal"></button>
              </div>
              <div className={`${style.modal_info} modal-body`}>
                <h5>About Me</h5>
                <p>{matchData.profile.description}</p>
              </div>

          </div>
        </div>
      </div>

    </div>
  );
};



