//Retrieving Current Date and Time
let dateElement = document.querySelector("#date");
let timeElement = document.querySelector("#time");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let month = currentTime.getMonth();
let dateInMonth = currentTime.getDate();
let day = currentTime.getDay(); //from 0 to 7
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
console.log(days[day]);
dateElement.innerHTML = `${days[day]} ${dateInMonth} ${months[month]}`;
timeElement.innerHTML = `${hours}:${minutes}`;

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let humid = document.querySelector("#humidity");
  let humidity = `${response.data.main.humidity}`;
  humid.innerHTML = `${humidity}%`;
  let wind = document.querySelector(".wind");
  let windSpeed = Math.round(`${response.data.wind.speed}`);
  wind.innerHTML = `${windSpeed} km/h`;
  let weatherDescription = document.querySelector(".description");
  let desc = `${response.data.weather[0].description}`;
  weatherDescription.innerHTML = `${desc}`;
}
//inputting city into search form
function searchCity(city) {
  let apiKey = `ce1871a4e8d3834f1e106be5fdeb2ff1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
//handleSub = searching for a city
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
  //let cityElement = document.querySelector("#city");
  // let cityInput = document.querySelector("#city-search");
  //cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-city");

searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = `ce1871a4e8d3834f1e106be5fdeb2ff1`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Temperate celsius to Fahrenheit
function convertToCelsiusLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 23;
}
function convertToFahrenheitLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsiusLink);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheitLink);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Yeovil");
