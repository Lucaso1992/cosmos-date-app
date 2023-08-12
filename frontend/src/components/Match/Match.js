import React, { useEffect, useState } from 'react';

import { useAppContext } from '../../flux/AppContext'
import user_Matches from "../../flux/DataProvisional.js";
import { updateLikes } from "../../Services/updateLikes";
import { updateDislikes } from '../../Services/updateDislikes';
import MatchAlert from "./Alert/MatchAlert.js";
import { mapZodiacSign } from './utills/mapZodiacSign.js';

import style from "./Match.module.css";
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { GiBeveledStar } from 'react-icons/gi';

export const Match = () => {
    const [matchIndex, setMatchIndex] = useState(0);
    const [matchData, setMatchData] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [userLikedId, setUserLikedId] = useState('');
    const [userDislikedId, setUserDislikedId] = useState("");
    const value = useAppContext();

    const token = value.store.token
    
    useEffect(() => {
        setUsersList(user_Matches);
    }, [])

    useEffect(() => {
        if (!usersList.length) return;
        setMatchData(usersList[matchIndex])
    }, [matchIndex, usersList])

    useEffect(() => {
        if (userLikedId!=='' && userLikedId!==undefined){
            updateLikes(token, userLikedId)
        }
    }, [userLikedId])

    
    useEffect(() => {
        if (userDislikedId!=='' && userDislikedId!==undefined){
            updateDislikes(token, userDislikedId)
        }
    }, [userDislikedId])


    const handleLike = (status) => {
        setMatchIndex((prevIndex) => {
            let index = prevIndex + 1;
            if (status === "like") {
                setUserLikedId(matchData.id);
            }
            if (status === "dislike") { setUserDislikedId(matchData.id)}
            return index === usersList.length ? index = 0 : index;
        });
    }

    if (!matchData) {
        return <div className={style.alert_div}>
            <MatchAlert />
        </div>
    }

    return (
        <div className={style.general_div}>
            <div className={style.img_div}>
                <img className={style.img} src={matchData.imageName} alt=""/>
            </div>
            <div className={style.infocontainer_div}>
                <div className={style.first_infodiv}>
                    <div className={style.name_zodiac_div}>
                        <h1 className={style.user_name}>
                            <strong>{matchData.user_name},</strong> {matchData.user_age}
                        </h1>
                        <p className={style.user_distance}>{matchData.user_city} - {matchData.user_distance}</p>
                    </div>
                    <div className={style.symbol_div}>
                        <div className={style.symbol}>{mapZodiacSign[matchData.zodiac_sign]}</div>
                        <p className={style.sign}>{matchData.zodiac_sign}</p>
                    </div>
                </div>
                <div className={style.data_div}>
                    <h5>ASTROLOGICAL DATA</h5>
                    <p>{matchData.astro_data}</p>
                    <h5>GENERAL INFORMATION</h5>
                    <p>{matchData.general_information}</p>
                </div>
                <div className={style.interactive_div}>
                    <div className={style.icons_div}>
                        <AiOutlineDislike className={style.icons} type="button" onClick={() => handleLike("dislike")} />
                        <GiBeveledStar className={style.icons} />
                        <AiOutlineLike className={style.icons} type="button" onClick={() => handleLike("like")} />
                    </div>
                    <div className={style.button_div}>
                        <button type="button" className={`${style.modal_button} btn btn-primary`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            More Info
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${ style.modal_div} modal fade`}id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`${style.modal_last} modal-dialog`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex flex-column">
                                <h1 className="modal-title fs-1" id="exampleModalLabel"><strong>{matchData.user_name}</strong>, {matchData.user_age}</h1>
                                <p className="card-text">{matchData.user_city}</p>
                                <p className="card-text">{matchData.user_distance}</p>
                            </div>
                            <button type="button" className="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className={`${style.modal_info} modal-body`}>
                            <h5 >ASTROLOGICAL DATA</h5>
                            <p >{matchData.astro_data}</p>
                            <h5>GENERAL INFORMATION</h5>
                            <p>{matchData.general_information}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



