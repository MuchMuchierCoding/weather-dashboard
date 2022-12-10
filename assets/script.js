var searchResultEl = document.querySelector('.searchResults');
var searchForecastEl = document.querySelector('.fiveDayForecast');
var userSearchBtn = document.querySelector('.searchBtn');
var api = "6d6b7757003525b60c4f3ac779725fdd"



function mainSearch(event) {
    console.log(event);
    var searchEl = document.querySelector(".userInput");
    var city = searchEl.value
    var url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+api 
    fetch(url)
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data);
        currentWeather(data[0].lat,data[0].lon)
    })

}

function currentWeather(lat,lon) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api+"&units=imperial"
    fetch(url)
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data);
        var city = data.name
        var timeStamp = data.dt
        var icon = data.weather[0].icon
        var temp = data.main.temp
        var wind = data.wind.speed
        var humidity = data.main.humidity
        var cityEl = document.createElement("p")
        cityEl.textContent = city
        var timeStampEl = document.createElement("p")
        timeStampEl.textContent = timeStamp
        var iconEl = document.createElement("img")
        iconEl.setAttribute("src", icon)
        var tempEl = document.createElement("p")
        tempEl.textContent = temp
        var windEl = document.createElement("p")
        windEl.textContent = wind
        var humidityEl = document.createElement("p")
        humidityEl.textContent = humidity
        searchResultEl.append(cityEl, timeStampEl, iconEl, tempEl, windEl, humidityEl)
    })
}

userSearchBtn.addEventListener('click', mainSearch) 











/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/