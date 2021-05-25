let now = new Date();

let h1Details = document.querySelector("#details");
console.log(h1Details);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h1Details.innerHTML = `${day} ${hour}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#tempNumber").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "60c52e9588bed9478b2ad668f1ee55d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchinput").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "60c52e9588bed9478b2ad668f1ee55d2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertC(event) {
  event.preventDefault();
  let tempC = document.querySelector("#tempNumber");
  tempC.innerHTML = 8;
}
function convertF(event) {
  event.preventDefault();
  let tempF = document.querySelector("#tempNumber");
  tempF.innerHTML = 55;
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btnSearch");
currentLocationButton.addEventListener("click", getCurrentLocation);
