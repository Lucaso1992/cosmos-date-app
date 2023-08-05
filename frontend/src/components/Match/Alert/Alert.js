import style from "./Alert.module.css";

const Alert = () => {
    return (
        <div className={style.alert_div}>
            <p className={style.message}> <strong>Oops... something went wrong. Please, try again later!</strong></p>
        </div>
    )
}

export default Alert;