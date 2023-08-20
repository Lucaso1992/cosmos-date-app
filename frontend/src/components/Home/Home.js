import { DataHome } from "./utils/DataHome";
import { HorscopeCards } from "./utils/HorscopeCards";

import style from "./Home.module.css";

export const Home = () => {
  return (
    <div className={style.main_layout}>
      <h2 className={style.horoscope_title}>
        Horoscopes
      </h2>
      <div className={style.cards_father}>
      {DataHome.map(item => {
        return (
          <HorscopeCards 
            key={item.horoscope}
            horoscope={item.horoscope}
            zodical_sign={item.zodical_sign}
            text={item.text} />
        )
      })}
      </div>
    </div>
  );
};