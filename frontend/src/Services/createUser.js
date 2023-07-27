export const createUser = (username ,email, password) => {
  return(
    fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: username,
        email: email,
        password: password,
      })
    })
    .then(resp =>{
      if (resp.status===400){
        alert("This email already exist on data base");
      }
      else if (resp.status!==201){
        alert("There has been an error creating user");
      }
      else return true;
    })
    .catch(error => {
      console.log("Error:" + error);
    })
  )
}