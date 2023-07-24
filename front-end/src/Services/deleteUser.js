export const deleteUser = (token) => {
  return(
    fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer '+ token,
      }
    })
    .then(resp =>{
      if (resp.status!==200){
        alert("There has been an error deleting user Data");
      }
      else return resp.json();
    })
    .then(body => {
      return true
    })
    .catch(error => {
      console.log("Error:" + error);
    })
  )
}