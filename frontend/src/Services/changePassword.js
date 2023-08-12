export const changePassword = (token, password) => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/api/users/forgot-password/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
      })
    })
    .then(resp =>{
      if (resp.status===404){
        alert("Token for changing password don't exist!");
      }
      else if (resp.status===403){
        alert("Token for changing password expired!");
      }
      else if (resp.status===200){
        alert("Password successfully changed!");
        return true;
      }
      else if (resp.status!==200){
        alert("There has been an error changing password...");
      }
    })
    .catch(error => {
      console.log("Error:" + error);
    })
  )
}
