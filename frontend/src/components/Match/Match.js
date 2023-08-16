import { useEffect, useState } from 'react';

import { useAppContext } from '../../flux/AppContext'
import { mapZodiacSign } from './utills/mapZodiacSign.js';
import { getMatch } from '../../Services/getMatch';
import { updateLikes } from "../../Services/updateLikes";
import { updateDislikes } from '../../Services/updateDislikes';

import style from "./Match.module.css";
import RingLoader from "react-spinners/RingLoader";
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { GiBeveledStar } from 'react-icons/gi';

export const Match = () => {
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
    if (status === "like") {
      updateLikes(token, matchData.id, setToken)
      .then((resp) => {
        getMatch(resp, setMatchData)
      })
    }
    else if (status === "dislike") {
      updateDislikes(token, matchData.id, setToken)
      .then((resp) => {
        getMatch(resp, setMatchData)
      })
    }
    return
  }

  if (Object.keys(matchData).length === 0) {
    return (
      <div>
        <RingLoader
          className={style.loader}
          color={"#fff"}
          size={140}
        />
      </div>
    )
  }

  return (
    <div className={style.general_div}>
      <div className={style.img_div}>
        <img className={style.img} src={matchData.profile.profile_image} alt=""/>
      </div>
      <div className={style.infocontainer_div}>
        <div className={style.first_infodiv}>
          <div className={style.name_zodiac_div}>

            <h1 className={style.user_name}>
              <strong>{matchData.user_name}</strong>, {matchData.profile.age}
            </h1>
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
            <AiOutlineDislike className={style.icons} type="button" onClick={() => handleLike("dislike")} />
            <GiBeveledStar className={style.icons} />
            <AiOutlineLike className={style.icons} type="button" onClick={() => handleLike("like")} />
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
                        <h1 className="modal-title fs-1" id="exampleModalLabel"><strong>{matchData.user_name}</strong>, {matchData.profile.age}</h1>
                        <p className="card-text">{matchData.profile.location}</p>
                        {/* <p className="card-text">{matchData.user_distance}</p> */}
                    </div>
                    <button type="button" className="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className={`${style.modal_info} modal-body`}>
                    {/* <h5 >ASTROLOGICAL DATA</h5>
                    <p >{matchData.astro_data}</p> */}
                    <h5>GENERAL INFORMATION</h5>
                    <p>{matchData.profile.description}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};



