fetch('..\src\components\Porfile\Porfile.js', {
  method: 'POST', 
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
})
.then(res => {
	if (!res.ok) throw Error(res.statusText);
	return res.json();
})
.then(response => console.log('Success:', response))
.catch(error => console.error(error));