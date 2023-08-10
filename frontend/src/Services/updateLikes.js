
export const updateLikes = (token, likeId) => {
    return (
        fetch(`${process.env.REACT_APP_API_URL}/api/users/update-likes`, 
        { method:"PUT",
            body:JSON.stringify({"user_like": likeId}),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                if (resp.status !== 200) {
                    alert("There has been an error, please try again");
                }
                else return resp.json();
            })
            
            .catch(error => {
                console.log("Error:" + error);
            })
    )
}