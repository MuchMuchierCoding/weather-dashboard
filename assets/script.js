var searchResultEl = document.querySelector('.searchResults');
var searchForecastEl = document.querySelector('.fiveDayForecast');
var userSearchBtn = document.querySelector('.searchBtn');
var api = "6d6b7757003525b60c4f3ac779725fdd"
var cityLog = JSON.parse(localStorage.getItem("cityLog"))||[]
var cityLogEl = document.querySelector('.cityLog');

function displayCityLog() {
    cityLogEl.innerHTML=""
    for(var i=0; i<cityLog.length; i++) {
        var btn = document.createElement("button")
        btn.textContent = cityLog[i]
        cityLogEl.append(btn)
    }
}

function mainSearch(event) {
    console.log(event);
    var searchEl = document.querySelector(".userInput");
    var city = searchEl.value
    cityLog.push(city)
    localStorage.setItem("cityLog", JSON.stringify(cityLog))
    displayCityLog()
    var url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+api 
    fetch(url)
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data);
        currentWeather(data[0].lat,data[0].lon)
        fiveDayWeather(data[0].lat,data[0].lon)
    })

}

function currentWeather(lat,lon) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api+"&units=imperial"
    fetch(url)
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data);
        searchResultEl.innerHTML=""
        var city = data.name
        var timeStamp = dayjs.unix(data.dt).format("MM/DD/YYYY")
        var icon = data.weather[0].icon
        var temp = data.main.temp
        var wind = data.wind.speed
        var humidity = data.main.humidity
        var cityEl = document.createElement("p")
        cityEl.textContent = city
        var timeStampEl = document.createElement("p")
        timeStampEl.textContent = timeStamp
        var iconEl = document.createElement("img")
        iconEl.setAttribute("src", "http://openweathermap.org/img/wn/"+icon+"@2x.png")
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

function fiveDayWeather(lat,lon) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+api+"&units=imperial"
    fetch(url)
    .then(function(response) {
        return response.json()
    }) .then(function(data) {
        console.log(data);
        searchForecastEl.innerHTML=""
        for (var i=0; i<data.list.length; i+=8) {
            var timeStampFive = dayjs.unix(data.list[i].dt).format("MM/DD/YYYY")
            timeStampFiveEl = document.createElement("p")
            timeStampFiveEl.textContent = timeStampFive

            var iconFive = data.list[i].weather[0].icon
            iconFiveEl = document.createElement("img")
            iconFiveEl.setAttribute("src", "http://openweathermap.org/img/wn/"+iconFive+"@2x.png")

            var tempFive = data.list[i].main.temp
            tempFiveEl = document.createElement("p")
            tempFiveEl.textContent = tempFive

            var windFive = data.list[i].wind.speed
            windFiveEl = document.createElement("p")
            windFiveEl.textContent = windFive
            
            var humidityFive = data.list[i].main.humidity
            humidityFiveEl = document.createElement("p")
            humidityFiveEl.textContent = humidityFive

            searchForecastEl.append(timeStampFiveEl, iconFiveEl, tempFiveEl, windFiveEl, humidityFiveEl)
        
        }

    })
};

displayCityLog()








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