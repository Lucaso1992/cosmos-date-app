export const updateProfile = (token, profileData, updateTokenFuntion) => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/api/users/update-profile`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
    .then((resp) => {
      if (resp.status !== 200) {
        alert("There has been an error loading user Data");
      } else return resp.json();
    })
    .then((body) => {
      sessionStorage.setItem("token", body.refresh_token);
      updateTokenFuntion(body.refresh_token);
      return true;
    })
    .catch((error) => {
      console.log("Error:" + error);
    })
  )
};