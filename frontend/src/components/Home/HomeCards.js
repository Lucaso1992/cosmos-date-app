import style from './Home.module.css'

export const HomeCards = ({ horoscope, zodical_sign, text }) => {
    return (
        <div className={style.horoscope_cards}>
            <h6>{horoscope}</h6>
            <div>{zodical_sign}</div>
            <p className='mx-1'>{text}</p>
        </div>
    )
}