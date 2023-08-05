import style from "./LandingPage.module.css"

export const LandingPage = () => {
  return (
<div className={style.landing_container}>
      <div className={style.landing_div}>
        <h1 className="mb-4"><strong>Welcome to Cosmos!</strong></h1>
        <p className={`${style.phrase} card-text`}><strong>
        Enter a world where astrology's magic meets arranged dating's thrill, offering a unique love experience. Welcome to Cosmos, where planets connect like-minded hearts.</strong></p>
        <div>
          <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal" className={`${style.button}`}>Tell me more</button>
        </div>
      </div>
    </div>
  )
}