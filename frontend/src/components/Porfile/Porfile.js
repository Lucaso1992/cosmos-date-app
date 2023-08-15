import { useState } from "react";
import { useFormik } from 'formik';

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
  const defaultImage = 'https://static.wixstatic.com/media/4151a5_7706b6198d164a3e947f4548166228ad~mv2.png'
  const value = useAppContext();
  const [urlImage, setUrlImage] = useState(defaultImage);


  const token = value.store.token
  const setToken = value.actions.setToken


  const onSubmit = (values, actions) => {
    updateProfile(token, values, setToken);
    actions.resetForm();
    setUrlImage(defaultImage);
  };

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = 
  useFormik({
    initialValues: {
      profile_image: '',
      zodiac_sign: '',
      location: '',
      location_born: '',
      gender: '',
      date_born: '',
      love_interest: '',
      height: '',
      description: ''
    },
    validationSchema:  profileSchema,
    onSubmit,
  });

  const onHandleImageUpload = (url) => {
    values.profile_image = url
    setUrlImage(url);
  };


  return (
    <div className={style.container_div}>

        <div className={style.header_container}>
          <h2>Profile</h2>
          <GoGear className={style.gear_icon}/>
        </div>

        <div>
        <form onSubmit={handleSubmit}>
          <div className={style.form_body}>

            <div className={style.form_div}> 
              <div className={style.form_card}>

                <h4 className={style.sub_title}>
                  <HiOutlineInformationCircle />
                  Personal Info
                </h4>

                <div>
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    placeholder="Height (cm)"
                    value={values.height}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                  {errors.height && touched.height &&(
                    <p className={style.error_text}>{errors.height}</p>
                  )}
                </div>

                <div>
                  <select
                    id="zodiac_sign"
                    className="form-select"
                    value={values.zodiac_sign}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required >
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
                  {errors.zodiac_sign && touched.zodiac_sign &&(
                    <p className={style.error_text}>{errors.zodiac_sign}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    placeholder="City, Country"
                    value={values.location} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required />
                  {errors.location && touched.location &&(
                    <p className={style.error_text}>{errors.location}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="location_born"
                    placeholder="Where have you been born?"
                    value={values.location_born} 
                    onChange={handleChange}
                    onBlur={handleBlur} />
                </div>

                <div>
                  <select
                    id="gender"
                    className="form-select"
                    aria-label="Default select example"
                    value={values.gender} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required>
                    <option >Pick a Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Prefer not say">Prefer not say</option>
                  </select>
                  {errors.gender && touched.gender &&(
                    <p className={style.error_text}>{errors.gender}</p>
                  )}
                </div>

                <div>
                  <input
                    className="form-control"
                    type="datetime-local"
                    id="date_born"
                    value={values.date_born}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required />
                  {errors.date_born && touched.date_born &&(
                    <p className={style.error_text}>{errors.date_born}</p>
                  )}
                </div>

                <div>
                  <select
                    type="text"
                    id="love_interest"
                    className="form-select"
                    aria-label="Default select example"
                    value={values.love_interest}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required >
                    <option >Interested in</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Indifferent">Indifferent</option>
                  </select>
                  {errors.love_interest && touched.love_interest &&(
                    <p className={style.error_text}>{errors.love_interest}</p>
                  )}
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
                    id="uploadedimage"
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
                  <textarea
                    className={style.textarea}
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
              </div>

            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className={`${style.submit_button} btn`}>
              Send
            </button>
          </div>

        </form>
        </div>

    </div>
  );
};
