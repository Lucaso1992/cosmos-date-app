export const getUserData = (token, updateFunction) => {
  return(
    fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
      headers: {
        'Authorization': 'Bearer '+ token
      }
    })
    .then(resp =>{
      if (resp.status!==200){
        alert("There has been an error loading user Data");
      }
      else return resp.json();
    })
    .then(body => {
      updateFunction(body);
      return true
    })
    .catch(error => {
      console.log("Error:" + error);
    })
  )
}