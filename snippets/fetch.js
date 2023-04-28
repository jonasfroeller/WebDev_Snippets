fetch(`https://`)
.then((response) => {
    console.log(response);
    return response.json();
})
.then((data) => {
    console.log(data);
    return data;
})
.then((data) => {
    document.querySelector('#output').innerHTML += `${data}`;
})
.catch((error) => {
    console.log('Error Code: ' + error);
});