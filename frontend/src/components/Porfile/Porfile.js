import style from "./Porfile.module.css";

export const Porfile = () => {
  return (
    <div className={style.profile_container}>
      <div className={style.main_header}>
        <h1 className="p-1 ms-3">Profile</h1>
      </div>

      <div className={style.main_layout}>
        <div className={style.personal_info}>
          <h4 className="p-0 mb-0">Personal Info</h4>
          <button className="btn p-0 mt-0 mb-2">Edit</button>
          <form>
            <div class="input-group my-2">
              <label for="form-name" class="form-label"></label>
              <input
                type="name"
                class="form-control"
                id="form-name"
                placeholder="Name"
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
              <select class="form-select" aria-label="Default select example">
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
              <select class="form-select" aria-label="Default select example">
                <option selected>Country</option>
                <option value="1">Argentina</option>
                <option value="2">Spain</option>
                <option value="2">Guatemala</option>
                <option value="4">Venezuela</option>
                <option value="5">Other</option>
              </select>
            </div>

            <div className="input-group my-2">
              <select class="form-select" aria-label="Default select example">
                <option selected>Gender</option>
                <option value="1">Female</option>
                <option value="2">Male</option>
                <option value="3">Others</option>
              </select>
            </div>

            <input type="date" id="start" name="birthdate" />
          </form>
        </div>
        <div className={style.about_photos}>
          <div className={style.photos}>
            <h4 className="p-3">Photos</h4>
          </div>
          <div className={style.about}>
            <h4 className="p-3">About Me</h4>
            </div>
          </div>
        </div>
      </div>
  );
};
