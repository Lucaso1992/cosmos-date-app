import style from "./MatchAlert.module.css";

const MatchAlert = () => {
    return (
        <div className={style.alert_div}>
            <p className={style.message}> <strong>Oops... something went wrong. Please, try again later!</strong></p>
        </div>
    )
}

export default Alert;