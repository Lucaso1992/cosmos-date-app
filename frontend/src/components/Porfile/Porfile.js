import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useFormik } from 'formik';

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
      // setFormValues(userData.profile)
    }
  }, [userData])
  
  const initialValues = {
    profile_image: '',
    zodiac_sign: '',
    location: '',
    location_born: '',
    gender: '',
    date_born: '',
    love_interest: '',
    height: '',
    description: ''
  }

  const onSubmit = (values, actions) => {
    console.log(values);
    // updateProfile(token, values, setToken);
    actions.resetForm();
    setUrlImage(defaultImage);
  };

  // const {values, errors, touched, handleBlur, handleChange, handleSubmit} = 
  // useFormik({
  //   initialValues: {
  //     profile_image: '',
  //     zodiac_sign: '',
  //     location: '',
  //     location_born: '',
  //     gender: '',
  //     date_born: '',
  //     love_interest: '',
  //     height: '',
  //     description: ''
  //   },
  //   validationSchema:  profileSchema,
  //   onSubmit
  // });

  const onHandleImageUpload = (url) => {
    // values.profile_image = url
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
                <Field
                  type="number"
                  // className={`${errors.height&&touched.height?`${style.input_error}`:''} form-control`}
                  name="height"
                  placeholder="Height (cm)" />
                <ErrorMessage name="height" className={style.error_text}/>
                {/* {errors.height && touched.height &&(
                  <p className={style.error_text}>{errors.height}</p>
                )} */}
              </div>

              <div>
                <Field as="select"
                  name="zodiac_sign"
                  // className={`${errors.zodiac_sign&&touched.zodiac_sign?`${style.input_error}`:''} form-select`} 
                  >
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
                {/* {errors.zodiac_sign && touched.zodiac_sign &&(
                  <p className={style.error_text}>{errors.zodiac_sign}</p>
                )} */}
              </div>

              <div>
                <Field
                  type="text"
                  // className={`${errors.location&&touched.location?`${style.input_error}`:''} form-control`}
                  name="location"
                  placeholder="City, Country" />
                <ErrorMessage name="location" />
                {/* {errors.location && touched.location &&(
                  <p className={style.error_text}>{errors.location}</p>
                )} */}
              </div>

              <div>
                <Field
                  type="text"
                  className="form-control"
                  name="location_born"
                  placeholder="Where have you been born?" />
              </div>

              <div>
                <Field as="select"
                  name="gender"
                  // className={`${errors.gender&&touched.gender?`${style.input_error}`:''} form-select`}
                  >
                  <option >Pick a Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Prefer not say">Prefer not say</option>
                </Field>
                <ErrorMessage name="gender" />
                {/* {errors.gender && touched.gender &&(
                  <p className={style.error_text}>{errors.gender}</p>
                )} */}
              </div>

              <div>
                <Field
                  type="datetime-local"
                  // className={`${errors.date_born&&touched.date_born?`${style.input_error}`:''} form-control`}
                  name="date_born" />
                <ErrorMessage name="date_born" />
                {/* {errors.date_born && touched.date_born &&(
                  <p className={style.error_text}>{errors.date_born}</p>
                )} */}
              </div>

              <div>
                <Field as="select"
                  type="text"
                  // className={`${errors.love_interest&&touched.love_interest?`${style.input_error}`:''} form-select`}
                  name="love_interest" >
                  <option >Interested in</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Indifferent">Indifferent</option>
                </Field>
                <ErrorMessage name="love_interest" />
                {/* {errors.love_interest && touched.love_interest &&(
                  <p className={style.error_text}>{errors.love_interest}</p>
                )} */}
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
