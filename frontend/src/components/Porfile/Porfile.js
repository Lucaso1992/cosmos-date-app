import { useState } from "react";

import { useAppContext } from '../../flux/AppContext'
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { updateProfile } from "../../Services/updateProfile.js";

import style from "./Porfile.module.css";

export const Porfile = () => {
  const value = useAppContext();
  const [profileData, setProfileData] = useState({
    profile_image: "",
    zodiac_sign: "",
    location: "",
    location_born: "",
    gender: "",
    date_born: "",
    love_interest: "",
    height: "",
    description: "",
  });

  const token = value.store.token
  const setToken = value.actions.setToken

  const onHandlChange = (e) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

  const onHandleImageUpload = (url) => {
    setProfileData({ ...profileData, profile_image: url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(token, profileData, setToken);
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
                    <label for="form-name" className="form-label"></label>
                    <input
                      type="number"
                      className="form-control"
                      id="height"
                      placeholder="cm"
                      value={profileData.height}
                      onChange={onHandlChange}
                    />
                  </div>
                  <div className="input-group my-2">
                    <select
                      id="zodiac_sign"
                      className="form-select"
                      aria-label="Default select example"
                      value={profileData.zodiac_sign}
                      onChange={onHandlChange}
                    >
                      <option selected>Zodiac Sign</option>
                      <option value="Aries">Aries</option>
                      <option value="Taurus">Taurus</option>
                      <option value="Gemini">Gemini</option>
                      <option value="Cancer">Cancer</option>
                      <option value="Leo">Leo</option>
                      <option value="Virgo">Virgo</option>
                      <option value="Libra">Libra</option>
                      <option value="Scorpius">Scorpius</option>
                      <option value="Sagittarius">Sagittarius</option>
                      <option value="Capricornus">Capricornus</option>
                      <option value="Aquarius">Aquarius</option>
                      <option value="Pices">Pices</option>
                    </select>
                  </div>

                  <div className="input-group my-2">
                    <label for="form-city" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      placeholder="City, Country"
                      value={profileData.location}
                      onChange={onHandlChange}
                    />
                  </div>

                  <div className="input-group my-2">
                    <label for="form-city" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="location_born"
                      placeholder="Where have you been born?"
                      value={profileData.location_born}
                      onChange={onHandlChange}
                    />
                  </div>

                  {/* <div className="input-group my-2">
                    <select
                      id="country"
                      className="form-select"
                      aria-label="Default select example"
                      value={profileData.country}
                      onChange={onHandlChange}
                    >
                      <option selected>Select a Country</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Spain">Spain</option>
                      <option value="Honduras">Honduras</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Other">Other</option>
                    </select>
                  </div> */}

                  <div className="input-group my-2">
                    <select
                      id="gender"
                      className="form-select"
                      aria-label="Default select example"
                      value={profileData.gender}
                      onChange={onHandlChange}
                    >
                      <option selected>Pick a Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Prefer not say">Prefer not say</option>
                    </select>
                  </div>

                  <div className="input-group my-2">
                    <input
                      className="form-control"
                      type="datetime-local"
                      id="date_born"
                      name="birthdate"
                      value={profileData.date_born}
                      onChange={onHandlChange}
                    />
                  </div>

                  <div className="input-group my-2">
                    <select
                      type="text"
                      id="love_interest"
                      className="form-select"
                      aria-label="Default select example"
                      value={profileData.love_interest}
                      onChange={onHandlChange}
                    >
                      <option selected>Interested in</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Everyone">Everyone</option>
                    </select>
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
                        src=""
                        className="img-fluid ms-auto pe-3"
                        alt="..."
                      />
                    </div>
                  </div>

                  <div className="input-group p-3">
                    <CloudinaryUploadWidget
                      onHandleImageUpload={onHandleImageUpload}
                    />

                    {/* <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                  /> */}
                  </div>
                </div>

                <div className={style.about}>
                  <h4 className="pt-3 ps-3">About Me</h4>
                  <div className="form-floating m-2">
                    <textarea
                      className="form-control"
                      id="description"
                      style={{ minHeight: "100px" }}
                      value={profileData.description}
                      onChange={onHandlChange}
                    ></textarea>
                    <label for="floatingTextarea2"></label>
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
