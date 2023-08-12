export const createProfile = (profileData) => {
    const token=sessionStorage.getItem("token")
    return(
      fetch(`${process.env.REACT_APP_API_URL}/api/users/update-profile`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          profileData
        )
      })
      .then(resp =>{
        if (resp.status===400){
          alert("Error Profile");
        }
        else if (resp.status!==201){
          alert("Error Profile");
        }
        else return true;
      })
      .catch(error => {
        console.log("Error:" + error);
      })
    )
  }