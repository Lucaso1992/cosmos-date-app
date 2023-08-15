import { useState } from "react";
import { useFormik } from 'formik';

import { useAppContext } from '../../flux/AppContext'
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { updateProfile } from "../../Services/updateProfile.js";
import { profileSchema } from '../../Schemas/profileSchema';

import style from "./Porfile.module.css";

export const Porfile = () => {
  const value = useAppContext();
  const [urlImage, setUrlImage] = useState('');


  const token = value.store.token
  const setToken = value.actions.setToken


  const onSubmit = (values, actions) => {
    updateProfile(token, values, setToken);
    actions.resetForm();
    setUrlImage('');
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
    <div className={`${style.container_div} container`}>
      <div className={`${style.card_div} card `}>
        <div className="card-header main_header">
          <h2 className="ms-3 mb-0">Profile</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-body main_layout ">
            <div className="row d-flex justify-content-center ">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className={style.personal_info}>
                  <h4 className="p-0 mb-0">Personal Info</h4>
                  <button className="btn p-0 mt-0 mb-3">Edit</button>
                  <div className="input-group my-2">

                    <input
                      type="number"
                      className="form-control"
                      id="height"
                      placeholder="cm"
                      value={values.height}
                      onChange={handleChange}
                      onBlur={handleBlur} />

                    {errors.height && touched.height &&(
                      <p className={style.error_text}>{errors.height}</p>
                    )}
                  </div>
                  <div className="input-group my-2">
                    <select
                      id="zodiac_sign"
                      className="form-select"
                      aria-label="Default select example"
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

                  <div className="input-group my-2">
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

                  <div className="input-group my-2">
                    <input
                      type="text"
                      className="form-control"
                      id="location_born"
                      placeholder="Where have you been born?"
                      value={values.location_born} 
                      onChange={handleChange}
                      onBlur={handleBlur} />
                  </div>

                  <div className="input-group my-2">
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

                  <div className="input-group my-2">
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

                  <div className="input-group my-2">
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

              <div className="col-lg-4 col-md-6 col-sm-12 m-1">
                <div className={style.photos}>
                  <div className="d-flex pt-3 ps-3">
                    <div>
                      <h4 className="mb-0">Photos</h4>
                      <button className="btn p-0 mt-0">Edit</button>
                    </div>

                    <div className="col-6 ms-auto">
                      <img
                        id="uploadedimage"
                        src={urlImage}
                        className="img-fluid ms-auto pe-3"
                        alt="..."
                      />
                    </div>
                  </div>

                  <div className="input-group p-3">
                    <CloudinaryUploadWidget
                      onHandleImageUpload={onHandleImageUpload}
                    />
                  </div>
                </div>

                <div className={style.about}>
                  <h4 className="pt-3 ps-3">About Me</h4>
                  <div className="form-floating m-2">
                    <textarea
                      className="form-control"
                      id="description"
                      style={{ minHeight: "100px" }}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center pb-3">
            <button type="submit" className={`${style.submit_button} btn`}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
