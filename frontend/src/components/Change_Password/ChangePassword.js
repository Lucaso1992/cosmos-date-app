import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';

import { changePassword } from '../../Services/changePassword'
import { changePasswordSchema } from '../../Schemas/changePasswordSchema';

import style from "./ChangePassword.module.css"
import { BiSolidLock } from "react-icons/bi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export const ChangePassword = () => {
  const [viewPassword, setViewPassword] = useState(false);

  const params = useParams();
  const navigate = useNavigate()


  const onSubmit = async(values, actions)=>{
    changePassword(params.token, values.password)
    .then((resp)=>{
      if (resp){
        navigate('/');
        actions.resetForm();
      }
      else return
    })
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit } = 
  useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema:  changePasswordSchema,
    onSubmit,
  });


  return (
    <div className={style.port_view}>
      <div className={style.modal_content}>
        <div className={style.modal_body}>
          
          <h2>Change password</h2>
          
          <form onSubmit={handleSubmit}>

            <div className={`${style.input_box}  ${errors.password&&touched.password?`${style.input_error}`:''}`}>
              <span className={style.icon} onClick={()=>setViewPassword(!viewPassword)}>
                {viewPassword?<BsEyeFill />:<BsEyeSlashFill />}
              </span>
              <input 
                type={viewPassword?'text':'password'} 
                id="password"
                value={values.password} 
                onChange={handleChange}
                onBlur={handleBlur}
                required/> 
              <label>New Password:</label>
              {errors.password && touched.password &&(
                <p className={style.error_text}>{errors.password}</p>
              )}
            </div>

            <div className={`${style.input_box}  ${errors.confirmPassword&&touched.confirmPassword?`${style.input_error}`:''}`}>
              <span className={style.icon}>
                <BiSolidLock />
              </span>
              <input 
                type='password' 
                id="confirmPassword"
                value={values.confirmPassword} 
                onChange={handleChange}
                onBlur={handleBlur}
                required/> 
              <label>Confirm Password:</label>
              {errors.confirmPassword && touched.confirmPassword &&(
                <p className={style.error_text}>{errors.confirmPassword}</p>
              )}
            </div>

            <button type='submit' className={style.submit_btn}>
              Save Password
            </button>
            
          </form>

        </div>
      </div>
    </div>
  )
}
