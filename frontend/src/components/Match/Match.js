import style from "./Match.module.css";
import MatchAlert from "./Alert/MatchAlert.js";

import React, { useEffect, useState } from 'react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { GiBeveledStar } from 'react-icons/gi';
import user_Matches from "../../flux/DataProvisional.js";
import { updateLikes } from "../../Services/updateLikes";

export const MatchTwo = () => {
    const [matchIndex, setMatchIndex] = useState(0);
    const [matchData, setMatchData] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [usersAlreadyWatched, setUsersAlreadyWatched] = useState([]);
    const [userLikesId, setUserLikesId] = useState([]);

    const localToken = sessionStorage.getItem("token");

    
    useEffect(() => {
        setUsersList(user_Matches);
    }, [])

    useEffect(() => {
        if (!usersList.length) return;
        setMatchData(usersList[matchIndex])
    }, [matchIndex, usersList])

    useEffect(() => {updateLikes(localToken, userLikesId)}, [userLikesId])

    const handleInteraction = (status) => {
        setMatchIndex((prevIndex) => {
            let index = prevIndex + 1;
            setUsersAlreadyWatched([...usersAlreadyWatched, matchData.id]);
            if (status === "like" && !userLikesId.includes(matchData.id)) {
                setUserLikesId([...userLikesId, matchData.id]);
                
            }
            
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
                        <div className={style.symbol}>{matchData.zodiac_simbol}</div>
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
                        <AiOutlineDislike className={style.icons} type="button" onClick={() => handleInteraction("dislike")} />
                        <GiBeveledStar className={style.icons} />
                        <AiOutlineLike className={style.icons} type="button" onClick={() => handleInteraction("like")} />
                    </div>
                    <div className={style.button_div}>
                        <button type="button" className={`${style.modal_button} btn btn-primary`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            More Info
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex flex-column">
                                <h1 className="modal-title fs-1" id="exampleModalLabel"><strong>{matchData.user_name}</strong>, {matchData.user_age}</h1>
                                <p className="card-text">{matchData.user_city}</p>
                                <p className="card-text">{matchData.user_distance}</p>
                            </div>
                            <button type="button" className="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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



