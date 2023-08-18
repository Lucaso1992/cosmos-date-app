import style from './Home.module.css'

export const HomeCards = ({ horoscope, zodical_sign, text }) => {
    return (
        <div className={style.horoscope_cards}>
            <h6>{horoscope}</h6>
            <div>{zodical_sign}</div>
            <p>{text}</p>
        </div>
    )
}