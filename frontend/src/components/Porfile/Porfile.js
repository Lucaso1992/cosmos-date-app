import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useAppContext } from '../../flux/AppContext'
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { updateProfile } from "../../Services/updateProfile.js";
import { profileSchema } from '../../Schemas/profileSchema';

import style from "./Porfile.module.css";
import { GoGear } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { PiUserSquare } from "react-icons/pi";
import { RiUserHeartLine } from "react-icons/ri";
import { CiRuler } from "react-icons/ci";
import { GiStarSwirl } from "react-icons/gi";
import { SlLocationPin } from "react-icons/sl";
import { LiaTransgenderSolid } from "react-icons/lia";
import { BsSearchHeart, BsCalendar2Date } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

export const Porfile = () => {
  const defaultImage = 'https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png';
  const [formValues, setFormValues] = useState(null);
  const [urlImage, setUrlImage] = useState(defaultImage);
  const [editMode, setEditMode] = useState(false);
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
        date_born: date.toISOString().slice(0, -14),
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
    updateProfile(token, values, setToken);
    setEditMode(false);
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
        {editMode ? (
          <RxCrossCircled className={style.gear_icon} onClick={() => setEditMode(!editMode)}/>
        ):(
          <GoGear className={style.gear_icon} onClick={() => setEditMode(!editMode)}/>
        )}
        
      </div>

      <Formik
        initialValues={formValues || initialValues}
        validationSchema={profileSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
      {formik =>{
        const {errors, touched} = formik
        return(
          <Form>
          <div className={style.form_body}>

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
                <div className={style.upload_widget}>
                  <CloudinaryUploadWidget
                    onHandleImageUpload={onHandleImageUpload}
                  />
                </div>
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

            <div className={style.form_div}> 
              <div className={style.form_card}>

                <h4 className={style.sub_title}>
                  <HiOutlineInformationCircle />
                  Personal Info
                </h4>

                <div className={style.info_container}>
                  <div className={style.input_container}>
                    <CiRuler className={style.icons_input}/>
                    <div className="d-flex flex-column flex-grow-1 position-relative">
                      <label htmlFor="height" className={style.label}>Height (cm):</label>
                      <Field 
                        type="number" 
                        name="height" 
                        className={`${errors.height&&touched.height?`${style.input_error}`:''} ${style.input}`} 
                        placeholder="Height (cm)" >
                      </Field>
                      <ErrorMessage name="height" component='p' className={style.error_text}/>
                    </div>
                  </div>

                  <div className={style.input_container}>
                    <GiStarSwirl className={style.icons_input}/>
                    <div  className="d-flex flex-column flex-grow-1 position-relative">
                      <label htmlFor="zodiac_sign" className={style.label}>Zodiac Sign:</label>
                      <Field
                        as="select" 
                        className={`${errors.zodiac_sign&&touched.zodiac_sign?`${style.input_error}`:''} ${style.select}`}
                        name="zodiac_sign" >
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
                      </Field>
                      <ErrorMessage name="zodiac_sign" component='p' className={style.error_text}/>
                    </div>
                  </div>

                  <div className={style.input_container}>
                    <SlLocationPin className={style.icons_input}/>
                    <div className="d-flex flex-column flex-grow-1 position-relative">
                      <label htmlFor="location" className={style.label}>Location:</label>
                      <Field 
                        type="text" 
                        name="location" 
                        className={`${errors.location&&touched.location?`${style.input_error}`:''} ${style.input}`}
                        placeholder="City, Country">
                      </Field>
                      <ErrorMessage name="location" component='p' className={style.error_text}/>
                    </div>
                  </div>

                  <div className={style.input_container}>
                    <LiaTransgenderSolid className={style.icons_input}/>
                    <div className="d-flex flex-column flex-grow-1 position-relative">
                      <label htmlFor="gender" className={style.label}>Gender:</label>
                      <Field as="select" 
                        name="gender"
                        className={`${errors.gender&&touched.gender?`${style.input_error}`:''} ${style.select}`}>
                        <option >Pick a Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage name="gender" component='p' className={style.error_text}/>
                    </div>
                  </div>

                  <div className={style.input_container}>
                    <BsCalendar2Date className={style.icons_input}/>
                    <div className="d-flex flex-column flex-grow-1 position-relative">
                      <label htmlFor="date_born" className={style.label}>Date Born:</label>
                      <Field 
                        name="date_born" 
                        type="date" 
                        className={`${errors.date_born&&touched.date_born?`${style.input_error}`:''} ${style.input}`}>
                      </Field>
                      <ErrorMessage name="date_born" component='p' className={style.error_text}/>
                    </div>
                  </div>

                  <div className={style.input_container}>
                    <BsSearchHeart className={style.icons_input}/>
                    <div className="d-flex flex-column flex-grow-1 position-relative">
                      <label htmlFor="love_interest" className={style.label}>Looking for:</label>
                      <Field as="select" 
                        type="text" 
                        name="love_interest" 
                        className={`${errors.love_interest&&touched.love_interest?`${style.input_error}`:''} ${style.select}`}>
                        <option >Interested in</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Indifferent">Indifferent</option>
                      </Field>
                      <ErrorMessage name="love_interest" component='p' className={style.error_text}/>
                    </div>
                  </div>
                </div>



              </div>
            </div>

          </div>

          {/* {
            editMode ? ( */}
              <div className="d-flex justify-content-center">
                <button type="submit" className={`${style.submit_button} ${editMode?'':style.hide}`}>
                  Save
                </button>
              </div>
            {/* ):''
          } */}

          </Form>
        )
      }}
      </Formik>

    </div>
  );
};
