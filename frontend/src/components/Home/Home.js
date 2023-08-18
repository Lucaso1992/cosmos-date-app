import style from "./Home.module.css";

export const Home = () => {
  return (
    <div className={style.main_layout}>
      <h2 className='text-center my-3'>
        Horoscopes
      </h2>
      <div className={style.cards_father}>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
        <div className={style.horoscope_cards}></div>
      </div>
    </div>
  );
};