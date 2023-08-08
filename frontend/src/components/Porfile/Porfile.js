import style from "./Porfile.module.css";

export const Porfile = () => {
  return (
    <div className={style.profile_container}>
      <div className={style.main_header}>
        <p>Profile</p>
      </div>

      <div className={style.main_layout}>
        <div className={style.personal_info}>
          <h1>Personal Info</h1>
          <button>Edit</button>
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
              <select
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>Zodiac Sign</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
                <option selected>Country</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          
            <div className="input-group my-2">
              <select
                class="form-select"
                aria-label="Default select example"
              >
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
            <h1>Photos</h1>
          </div>
          <div className={style.about}>
            <h1>About You</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
