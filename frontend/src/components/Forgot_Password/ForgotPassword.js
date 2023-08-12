import { useState } from 'react'
import { useFormik } from 'formik';

import { recoverPassword } from '../../Services/recoverPassword'
import { forgotPasswordSchema } from '../../Schemas/loginSchema';

import style from "./ForgotPassword.module.css"
import RingLoader from "react-spinners/RingLoader";
import { IoIosMail } from "react-icons/io";


export const ForgotPassword = ({handle_ForgotMode}) => {
  const [showSpiner, setShowSpiner] = useState(false);


  const onSubmit = async(values, actions)=>{
    setShowSpiner(true);

    recoverPassword(values.email)
    .then((resp)=>{
      if (resp){
        actions.resetForm();
        alert("Check your inbox for recovery your password.");
      }
      else return
    })
    .then(()=>{
      setShowSpiner(false);
    })
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = 
  useFormik({
    initialValues: {
      email: '',
    },
    validationSchema:  forgotPasswordSchema,
    onSubmit,
  });


  return (
    <>
    {
      showSpiner?(
        <RingLoader
          className={style.loader}
          color={"#fff"}
          size={140}
        />
      ):(
        <>
        <h2>Recovery</h2>
        <h2>Password</h2>
        
        <form className={style.form} onSubmit={handleSubmit}>

          <div className={`${style.input_box} ${errors.email&&touched.email?`${style.input_error}`:''}`}>
            <span className={style.icon}>
              <IoIosMail />
            </span>
            <input 
              type='text'
              id="email"
              value={values.email} 
              onChange={handleChange}
              onBlur={handleBlur}
              required/>
            <label>Email:</label>
            {errors.email && touched.email &&(
              <p className={style.error_text}>{errors.email}</p>
            )}
          </div>

          <button type='submit' className={style.submit_btn}>
            Send me an Email
          </button>
          
          <div className={style.singIn_register}>
            <p>
              Don't have an account?
              <button type='button' className={style.register_link} onClick={handle_ForgotMode}>
                Sing in
              </button>
            </p>
          </div>
          
        </form>
        </>
      )
    }
    </>
  )
}
