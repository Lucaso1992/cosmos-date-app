import style from "./ConfirmModal.module.css"
import { AiOutlineClose } from "react-icons/ai";

export const ConfirmModal = ({showModal, modalFunction, titleText, textModal, iconText, greenTextBtn, redTextBtn}) => {


  return (
      <div className={style.modal_container}>
        <div className={style.modal_content}>

          <button className={style.icon_close} onClick={showModal}>
            <AiOutlineClose />
          </button>

          <div className={style.modal_body}>
            <h3 className='text-center'>{titleText}</h3>

            <div className={style.text_content}>
              <p className={style.text}>
                {textModal}
              </p>
              {iconText}
            </div>

            <div className={style.modal_footer}>
              <button className={style.modal_cancel_btn} onClick={showModal}>
                {greenTextBtn}
              </button>
              <button className={style.modal_delete_btn} onClick={modalFunction}>
                {redTextBtn}
              </button>
            </div>
          </div>

        </div>
      </div>
  )
}