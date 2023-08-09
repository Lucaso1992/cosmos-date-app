// import style from "./Match.module.css";
// import MatchAlert from "./Alert/MatchAlert.js";

// import React, { useEffect, useState } from 'react';
// import { AiFillLike, AiFillDislike, AiOutlineStar } from 'react-icons/ai';
// import user_Matches from "./../../flux/DataProvisional.js";

// export const Match = () => {
//   const [matchIndex, setMatchIndex] = useState(0);
//   const [matchData, setMatchData] = useState({});
//   const [usersList, setUsersList] = useState([]);
//   const [usersAlreadyWatched, setUsersAlreadyWatched] = useState([]);
//   const [userLikesId, setUserLikesId] = useState([]);

//   useEffect(() => {
//     setUsersList(user_Matches);
//   }, [])

//   useEffect(() => {
//     if (!usersList.length) return;
//     setMatchData(usersList[matchIndex])
//   }, [matchIndex, usersList])

//   const handleInteraction = (status) => {
//     setMatchIndex((prevIndex) => {
//       let index = prevIndex + 1;
//       setUsersAlreadyWatched([...usersAlreadyWatched, matchData.id]);
//       if (status === "like") {
//         setUserLikesId([...userLikesId, matchData.id]);
//       }
//       return index === usersList.length ? index = 0 : index;
//     });

//   }
//   if (!matchData) {
//     return <div className={style.alert_div}>
//       <MatchAlert />
//     </div>
//   }

//   return (
//     <div className={style.match_container}>
//       <div className={style.match_card}>
//         <div className={`${style.img_div} col-md-4`} >
//           <img className={style.img_card} src={matchData.imageName} />
//         </div>
//         <div className="d-flex flex-column">
//           <div className={style.first_div}>
//             <h2 className="card-title ms-4">{matchData.user_name}, {matchData.user_age}</h2>
//             <p className="card-text mb-0 ms-4">{matchData.user_city}</p>
//             <p className="card-text ms-4"><small className="text-body-secondary">{matchData.user_distance}</small></p>
//             <button type="button" className={`${style.modal_button} btn btn-primary`} data-bs-toggle="modal" data-bs-target="#exampleModal">
//               More Info
//             </button>
//           </div>
//           <div className={style.second_div}>
//             <h5 className="ms-4">ASTROLOGICAL DATA</h5>
//             <p className="ms-4">{matchData.astro_data}</p>
//             <h5 className="ms-4">GENERAL INFORMATION</h5>
//             <p className="ms-4">{matchData.general_information}</p>
//           </div>
//           <div className={style.third_div}>
//             <AiFillDislike className={style.like_icons} type="button" onClick={() => handleInteraction("dislike")} />
//             <AiOutlineStar className={style.like_icons} />
//             <AiFillLike className={style.like_icons} type="button" onClick={() => handleInteraction("like")} />
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div className="d-flex flex-column">
//                   <h1 className="modal-title fs-1" id="exampleModalLabel"><strong>{matchData.user_name}</strong>, {matchData.user_age}</h1>
//                   <p className="card-text">{matchData.user_city}</p>
//                   <p className="card-text">{matchData.user_distance}</p>
//                 </div>
//                 <button type="button" className="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 <h5 >ASTROLOGICAL DATA</h5>
//                 <p >{matchData.astro_data}</p>
//                 <h5>GENERAL INFORMATION</h5>
//                 <p>{matchData.general_information}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



