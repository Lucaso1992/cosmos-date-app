import style from "./Home.module.css";
import { DataHome } from "./DataHome";
import { HomeCards } from "./HomeCards";


export const Home = () => {
  return (
    <div className={style.main_layout}>
      <h2 className={style.horoscope_title}>
        Horoscopes
      </h2>
      <div className={style.cards_father}>
      {DataHome.map(item => <HomeCards horoscope={item.horoscope} zodical_sign={item.zodical_sign} text={item.text}/>)}
      </div>
    </div>
  );
};