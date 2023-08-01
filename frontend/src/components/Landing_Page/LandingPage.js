import style from "./LandingPage.module.css"

export const LandingPage = () => {
  return (
<div className={style.landing_container}>
      <div className={style.landing_div}>
        <h1 className="mb-4"><strong>Welcome to Cosmos!</strong></h1>
        <p className="card-text"><strong>
Enter a world where the magic of astrology merges with the thrill of arranged dating, offering you a unique experience in love. We are delighted to welcome you to Cosmos, where the planets are our allies in connecting like-minded hearts.</strong></p>
        <div>
          <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" className={`${style.button}`}>Tell me more</button>
        </div>
      </div>
    </div>
  )
}