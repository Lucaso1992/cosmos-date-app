export const updateLikes = (token, likeId, updateTokenFuntion, updateMatch) => {
  return(
    fetch(`${process.env.REACT_APP_API_URL}/api/users/update-likes`, {
      method: "PUT",
      body: JSON.stringify({ "user_like": likeId }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
    .then((resp) => {
      if (resp.status !== 200) {
        alert("There has been an error, please try again");
      }
      else return resp.json();
    })
    .then(body => {
      updateTokenFuntion(body.refresh_token);
      updateMatch(body.posible_match);
      return true;
    })
    .catch((error) => {
      console.log("Error:" + error);
    })
  ) 
};
