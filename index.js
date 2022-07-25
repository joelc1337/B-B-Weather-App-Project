document.addEventListener('DOMContentLoaded', function() {

    retrieveKey();

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
    .then((data) => console.log(data))
}
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}