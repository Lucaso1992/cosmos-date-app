export const getAutentication = (email, password, updateTokenFuntion) => {
  return(
    fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    .then(resp =>{
      if (resp.status===401){
        alert("Your password is wrong!");
      }
      else if (resp.status===404){
        alert("This email don't exist on data base.");
      } 
      else if (resp.status!==200){
        alert("There has been an error");
      }
      else return resp.json();
    })

    .then(body => {
      sessionStorage.setItem("token", body.refresh_token);
      updateTokenFuntion(body.refresh_token);
      return true;
    })
    
    .catch(error => {
      console.log("Error:" + error);
    })
  )
}