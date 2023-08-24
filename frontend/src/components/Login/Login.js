import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from 'formik';

import { useAppContext } from '../../flux/AppContext'
import { getAutentication } from '../../Services/getAutentication'
import { createUser } from '../../Services/createUser'
import { ForgotPassword } from '../Forgot_Password/ForgotPassword';
import { loginSchema, singInSchema } from '../../Schemas/loginSchema';

import style from "./Login.module.css"
import RingLoader from "react-spinners/RingLoader";
import { IoIosMail } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidLock, BiSolidUser } from "react-icons/bi";


export const Login = () => {
  const value = useAppContext();
  const [showSpiner, setShowSpiner] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);


  const navigate = useNavigate()
  const token = value.store.token;

  
  const onSubmit = async(values, actions)=>{
    if (loginMode===true){
      setShowSpiner(true);
      getAutentication(values.email, values.password, value.actions.setToken)
      .then((resp)=>{
        if (resp){
          navigate('/Home');
          actions.resetForm();
        }
        else return
      })
      .then(()=>{
        setShowSpiner(false);
      })
    }
    else {
      setShowSpiner(true);
      createUser(values.userName, values.email, values.password)
      .then((resp)=>{
        if (resp){
          resetModal();
          actions.resetForm();
          alert("Check your inbox for verify your email address.");
        }
        else return
      })
      .then(()=>{
        setShowSpiner(false);
      })
    }
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = 
    useFormik({
      initialValues: {
        email: '',
        password: '',
        userName: ''
      },
      validationSchema:  loginMode?loginSchema:singInSchema,
      onSubmit,
    });

    const resetModal = () =>{
      setLoginMode(true);
      setForgotPassword(false);
      resetForm();
    }

    const changeLoginForm = () => {
      setLoginMode(!loginMode);
      resetForm();
    }
    const changeForgetMode = () => {
      setForgotPassword(!forgotPassword);
      setLoginMode(false);
      resetForm();
    }




  return (
    <div className='modal fade' id={`loginModal`} data-bs-backdrop="static">
    <div className='modal-dialog modal-dialog-centered justify-content-center'>
    <div className={`${style.modal_content} modal-content`}>

      <div className={`col-12`}>
        <button className={style.icon_close} type='button' onClick={resetModal} data-bs-dismiss="modal">
          <AiOutlineClose />
        </button>

        <div className={style.modal_body}>
          {
            showSpiner?(
              <RingLoader
                className={style.loader}
                color={"#fff"}
                size={140}
              />
            ):(
              forgotPassword?(
                <ForgotPassword handle_ForgotMode={changeForgetMode}/>
              ):(
                token && token!=="" && token!==undefined ?(
                  <>
                    <h2>Welcome,</h2>
                    <h2>{value.store.userData.user_name}!</h2>
                  </>
                ):(
                  <>
                  <h2>{loginMode?'Login':'Sign Up'}</h2>
                  
                  <form onSubmit={handleSubmit}>

                  {loginMode? '' :
                    <div className={`${style.input_box}  ${errors.userName&&touched.userName?`${style.input_error}`:''}`}>
                      <span className={style.icon}>
                        <BiSolidUser />
                      </span>
                      <input 
                        type='text'
                        id="userName"
                        value={values.userName} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required/> 
                      <label htmlFor='userName'>Username:</label>
                      {errors.userName && touched.userName &&(
                        <p className={style.error_text}>{errors.userName}</p>
                      )}
                    </div>
                  }

                    <div className={`${style.input_box}  ${errors.email&&touched.email?`${style.input_error}`:''}`}>
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
                      <label htmlFor='email'>Email:</label>
                      {errors.email && touched.email &&(
                        <p className={style.error_text}>{errors.email}</p>
                      )}
                    </div>

                    <div className={`${style.input_box}  ${errors.password&&touched.password?`${style.input_error}`:''}`}>
                      <span className={style.icon}>
                        <BiSolidLock />
                      </span>
                      <input 
                        type='password' 
                        id="password"
                        value={values.password} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required/> 
                      <label htmlFor='email'>Password:</label>
                      {errors.password && touched.password &&(
                        <p className={style.error_text}>{errors.password}</p>
                      )}
                    </div>

                    <div className={style.remember_forgot}>
                      <label>
                        <input type='checkbox' />
                        {loginMode?'Remember me':'I agreed to the terms & conditions'}
                      </label>
                      {loginMode?
                        (
                          <Link className={style.forgot_link} onClick={changeForgetMode}>
                            Forgot Password?
                          </Link>
                        ):''
                      }
                    </div>

                    <button type='submit' className={style.submit_btn}>
                      {loginMode?'Login':'Register'}
                    </button>
                    
                    <div className={style.login_register}>
                      <p>
                        {loginMode?"Don't have an account?":"You already have an account?"}
                        <button type='button' className={style.register_link} onClick={changeLoginForm}>
                          {loginMode?'Sign Up':'Login'}
                        </button>
                      </p>
                    </div>
                  </form>
                  </>
                )
              )
            )
          }
        </div>

      </div>

    </div>
    </div>
    </div>
  )
}
