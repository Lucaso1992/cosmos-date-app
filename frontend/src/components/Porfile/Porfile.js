import React, { useState } from "react"; 
import style from "./Porfile.module.css";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
  
  export const Porfile = () => {
    const [profileData, setProfileData] = useState({
      name: "",
      lastname: "",
      zodiacSign: "",
      city: "",
      country: "",
      gender: "",
      birthdate: "",
      interestedIn: "",
      aboutMe: "",
    });
  
    const onHandlChange = (e) => {
      const { name, value } = e.target;
      setProfileData({
        profileData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(profileData);
    };

  return (
    <div className="container mt-4 m-auto">
      <div class="card">
        <div className="card-header main_header">
          <h2 className="ms-3 p-2">Profile</h2>
        </div>

        <div className="card-body main_layout">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className={style.personal_info}>
                <h4 className="p-0 mb-0">Personal Info</h4>
                <button className="btn p-0 mt-0 mb-3">Edit</button>
                <form>
                  <div class="input-group my-2">
                    <label for="form-name" class="form-label"></label>
                    <input
                      type="name"
                      class="form-control"
                      id="form-name"
                      placeholder="Name"
                      value={profileData.name}
                      onChange={onHandlChange}
                    />
                  </div>

                  <div className="input-group my-2">
                    <label for="form-lastname" class="form-label"></label>
                    <input
                      type="lastname"
                      class="form-control"
                      id="form-lastname"
                      placeholder="Lastname"
                    />
                  </div>

                  <div className="input-group my-2">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Zodiac Sign</option>
                      <option value="1">Aries</option>
                      <option value="2">Taurus</option>
                      <option value="3">Gemini</option>
                      <option value="4">Cancer</option>
                      <option value="5">Leo</option>
                      <option value="6">Virgo</option>
                      <option value="7">Libra</option>
                      <option value="8">Scorpius</option>
                      <option value="9">Sagittarius</option>
                      <option value="10">Capricornus</option>
                      <option value="11">Aquarius</option>
                      <option value="12">Pices</option>
                    </select>
                  </div>

                  <div className="input-group my-2">
                    <label for="form-city" class="form-label"></label>
                    <input
                      type="city"
                      class="form-control"
                      id="form-city"
                      placeholder="City"
                    />
                  </div>

                  <div className="input-group my-2">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select a Country</option>
                      <option value="1">Argentina</option>
                      <option value="2">Spain</option>
                      <option value="2">Honduras</option>
                      <option value="4">Venezuela</option>
                      <option value="5">Other</option>
                    </select>
                  </div>

                  <div className="input-group my-2">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Pick a Gender</option>
                      <option value="1">Female</option>
                      <option value="2">Male</option>
                      <option value="3">Others</option>
                    </select>
                  </div>

                  <div className="input-group my-2">
                    <input
                      class="form-control"
                      type="date"
                      id="start"
                      name="birthdate"
                    />
                  </div>

                  <div className="input-group my-2">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Interested in</option>
                      <option value="1">Female</option>
                      <option value="2">Male</option>
                      <option value="3">Others</option>
                    </select>
                  </div>
                </form>
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
                      src="https://objetivoliga.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
                      className="img-fluid ms-auto pe-3"
                      alt="..."
                    />
                  </div>
                </div>

                <div class="input-group p-3">
                  <CloudinaryUploadWidget />
                  
                  
                  
                  {/* <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile01"
                  /> */}
                </div>
              </div>

              <div className={style.about}>
                <h4 className="pt-3 ps-3">About Me</h4>
                <div class="form-floating m-2">
                  <textarea
                    class="form-control"
                    id="floatingTextarea2"
                    style={{ minHeight: "100px" }}
                  ></textarea>
                  <label for="floatingTextarea2"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
