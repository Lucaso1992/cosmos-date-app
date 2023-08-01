import style from "./Match.module.css";


export const Match = ({ imageName, user_name, user_age, user_city, user_distance, astro_data, general_information }) => {

  return (
    <div className={style.match_container}>
      <div className={style.match_card}>
        <div className={`${style.img_div} col-md-4`}h-100>
          <img className={style.img_card} src={imageName}/>
        </div>
        <div className="d-flex flex-column">
          <div className={style.first_div}>
            <h2 className="card-title ms-4">{user_name}, {user_age}</h2>
            <p className="card-text mb-0 ms-4">{user_city}</p>
            <p className="card-text ms-4"><small className="text-body-secondary">{user_distance}</small></p>
          </div>
          <div className={style.second_div}> 
            <h5 className="ms-4">ASTROLOGICAL DATA</h5>
            <p className="ms-4">{astro_data}</p>
            <h5 className="ms-4">GENERAL INFORMATION</h5>
            <p className="ms-4">{general_information}</p>
          </div>
          <div className={style.third_div}>
            <div><i class="fa-regular fa-thumbs-down fa-2xl" style={{color: "#063254"}}></i></div>
            <div><i class="fa-regular fa-star fa-2xl" style={{color: "#063254"}}></i></div>
            <div><i class="fa-regular fa-thumbs-up fa-2xl" style={{color: "#063254"}}></i></div>
          </div>
        </div>
      </div>
    </div>
  )
}
