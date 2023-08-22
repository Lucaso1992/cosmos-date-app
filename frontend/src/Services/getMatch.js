export const getMatch = (token, updateFunction) => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/api/get_matches`, {
      headers: {
        'Authorization': 'Bearer '+ token
      }
    })
    .then(resp =>{
      console.log(resp.status)
      if (resp.status===404){
        throw new Error("There is no posible match found");
      }
      else if (resp.status!==200){
        alert("There has been an error getting posible match data");
        throw new Error("There has been an error getting posible match data");
      }
      else return resp.json();
    })
    .then(body => {
      console.log(body);
      updateFunction(body);
      return true
    })
    .catch(error => {
      console.log("Error:" + error);
    })
  )
}