let xhttp = new XMLHttpRequest();

xhttp.onloadend = function () {
    if (xhttp.status == 404) {
        console.log("Not found! " + xhttp.responseText);
    } else {
        console.log(xhttp.responseText);
    }
}

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let dataString = this.responseText;
        data = JSON.parse(dataString);

        console.log(data);

        document.querySelector('#output').innerHTML += `${data}`;
    };
}

xhttp.open("GET", `https://`, true);

xhttp.send();