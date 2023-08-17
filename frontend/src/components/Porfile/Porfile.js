import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useFormik } from 'formik';
// import { useFormikContext } from 'formik';

import { useAppContext } from '../../flux/AppContext'
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { updateProfile } from "../../Services/updateProfile.js";
import { profileSchema } from '../../Schemas/profileSchema';

import style from "./Porfile.module.css";
import { GoGear } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { PiUserSquare } from "react-icons/pi";
import { RiUserHeartLine } from "react-icons/ri";

export const Porfile = () => {
  const defaultImage = 'https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png';
  const [formValues, setFormValues] = useState(null);
  const [urlImage, setUrlImage] = useState(defaultImage);
  const value = useAppContext();


  const token = value.store.token
  const setToken = value.actions.setToken
  const userData = value.store.userData


  useEffect(() => {
    if (userData.profile !== undefined) {
      const user = userData.profile
      const date = new Date(user.date_born);
      setUrlImage(user.profile_image);

      setFormValues({
        profile_image: user.profile_image,
        zodiac_sign: user.zodiac_sign,
        location: user.location,
        gender: user.gender,
        date_born: date.toISOString().slice(0, -8),
        love_interest: user.love_interest,
        height: user.height,
        description: user.description
      })
    }
  }, [userData])
  
  const initialValues = {
    profile_image: '',
    zodiac_sign: '',
    location: '',
    gender: '',
    date_born: '',
    love_interest: '',
    height: '',
    description: ''
  }

  const onSubmit = (values) => {
    console.log(values);
    updateProfile(token, values, setToken);
  };



  const onHandleImageUpload = (url) => {
    setFormValues((prev) =>{
      return {...prev, profile_image: url}
    });
    setUrlImage(url);
  };



  return (
    <div className={style.container_div}>

      <div className={style.header_container}>
        <h2>Profile</h2>
        <GoGear className={style.gear_icon}/>
      </div>

      <Formik
        initialValues={formValues || initialValues}
        validationSchema={profileSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
      <Form>
        <div className={style.form_body}>

          <div className={style.form_div}> 
            <div className={style.form_card}>

              <h4 className={style.sub_title}>
                <HiOutlineInformationCircle />
                Personal Info
              </h4>

              <div>
                <Field type="number" name="height" placeholder="Height (cm)" >
                { props =>{
                  const {field, meta} = props;
                  return(
                    <input 
                      {...field}
                      className={`${meta.error&&meta.touched?`${style.input_error}`:''} form-control`} />
                  )
                }}
                </Field>
                <ErrorMessage name="height" component='p' className={style.error_text}/>
              </div>

              <div>
                <Field as="select" name="zodiac_sign" >
                { props =>{
                  const {field, meta} = props;
                  return(
                    <select 
                      {...field}
                      className={`${meta.error&&meta.touched?`${style.input_error}`:''} form-select`} >
                      <option >Zodiac Sign</option>
                      <option value="Aries">Aries</option>
                      <option value="Taurus">Taurus</option>
                      <option value="Gemini">Gemini</option>
                      <option value="Cancer">Cancer</option>
                      <option value="Leo">Leo</option>
                      <option value="Virgo">Virgo</option>
                      <option value="Libra">Libra</option>
                      <option value="Scorpio">Scorpio</option>
                      <option value="Sagittarius">Sagittarius</option>
                      <option value="Capricorn">Capricorn</option>
                      <option value="Aquarius">Aquarius</option>
                      <option value="Pisces">Pisces</option>
                    </select>
                  )
                }}
                </Field>
                <ErrorMessage name="zodiac_sign" component='p' className={style.error_text}/>
              </div>

              <div>
                <Field type="text" name="location" placeholder="City, Country">
                { props =>{
                  const {field, meta} = props;
                  return(
                    <input 
                      {...field}
                      className={`${meta.error&&meta.touched?`${style.input_error}`:''} form-control`} />
                  )
                }}
                </Field>
                <ErrorMessage name="location" component='p' className={style.error_text}/>
              </div>

              <div>
                <Field as="select" name="gender">
                { props =>{
                  const {field, meta} = props;
                  return(
                    <select 
                      {...field}
                      className={`${meta.error&&meta.touched?`${style.input_error}`:''} form-select`} >
                      <option >Pick a Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Prefer not say">Prefer not say</option>
                    </select>
                  )
                }}
                </Field>
                <ErrorMessage name="gender" component='p' className={style.error_text}/>
              </div>

              <div>
                <Field name="date_born" >
                { props =>{
                  const {field, meta} = props;
                  return(
                    <input 
                      {...field}
                      type="datetime-local" 
                      className={`${meta.error&&meta.touched?`${style.input_error}`:''} form-control`} />
                  )
                }}
                </Field>
                <ErrorMessage name="date_born" component='p' className={style.error_text}/>
              </div>

              <div>
                <Field as="select" type="text" name="love_interest" >
                { props =>{
                  const {field, meta} = props;
                  return(
                    <select 
                      {...field}
                      className={`${meta.error&&meta.touched?`${style.input_error}`:''} form-select`} >
                      <option >Interested in</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Indifferent">Indifferent</option>
                    </select>
                  )
                }}
                </Field>
                <ErrorMessage name="love_interest" component='p' className={style.error_text}/>
              </div>

            </div>
          </div>

          <div className={style.form_div}>
            <div className={style.form_card_aside}>
              <h4 className={style.sub_title}>
                <PiUserSquare />
                Photos
              </h4>
              <div className={style.foto_preview}>
                <img
                  name="uploadedimage"
                  src={urlImage}
                  className={style.img_foto}
                  alt=""
                />
              </div>
              <div>
                <CloudinaryUploadWidget
                  onHandleImageUpload={onHandleImageUpload}
                />
              </div>
            </div>

            <div className={style.form_card_aside}>
              <h4 className={style.sub_title}>
                <RiUserHeartLine />
                About Me
              </h4>
                <Field as="textarea"
                  className={style.textarea}
                  name="description">
                </Field>
            </div>

          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className={`${style.submit_button} btn`}>
            Send
          </button>
        </div>

      </Form>
      </Formik>

    </div>
  );
};
