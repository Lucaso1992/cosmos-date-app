export const updateDislikes = (token, dislikedId, updateTokenFuntion) => {
  return (
    fetch(`${process.env.REACT_APP_API_URL}/api/users/update-dislikes`, {
      method: "PUT",
      body: JSON.stringify({ user_dislike: dislikedId }),
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
    .then((body) => {
      updateTokenFuntion(body.refresh_token);
      return (body.refresh_token);
    })
    .catch((error) => {
      console.log("Error:" + error);
    })
  )
};
