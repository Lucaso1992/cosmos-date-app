export const recoverPassword = (email) => {
  return(
    fetch(`${process.env.REACT_APP_API_URL}/api/users/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    .then(resp =>{
      if (resp.status===404){
        alert("This email don't exist on data base");
      }
      else if (resp.status===400){
        alert("Email already sent with valid token.");
      }
      else if (resp.status!==200){
        alert("There has been an error sending the email");
      }
      else return true;
    })
    .catch(error => {
      console.log("Error:" + error);
    })
  )
}