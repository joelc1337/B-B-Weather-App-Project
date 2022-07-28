document.addEventListener('DOMContentLoaded', function() {

    retrieveKey();
    // console.log(convertDate(1658977200))
});

function retrieveKey(){
    fetch('./key.txt')
    .then((response) => response.text())
    .then((response) => retrieveLocation(response))
}


function retrieveLocation(key){
    navigator.geolocation.getCurrentPosition((position) => {
        retrieveWeatherData(position.coords.latitude, position.coords.longitude,key);
    })
}



function retrieveWeatherData(lat,long,key){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}`)
    .then((response) => response.json())
    .then((data) => renderWeatherData(data))
}

function renderWeatherData(data){

    console.log(data)
    
    for(let i = 0; i <= 39; i+=8){
        var card = document.querySelector(`#d${i/8}`)
        const weekday = convertDate(data.list[i].dt);
        const tempKelvin = data.list[i].main.temp;

        const tempeFarenheit = ((tempKelvin-273.15)*1.8)+32 // temperature in farenheit

        card.querySelector("h3").innerHTML = weekday;
        card.querySelector("span").innerHTML = Math.floor(tempeFarenheit);
    }



}

function convertDate(timestamp){
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('default', {weekday:'long'});
}