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
  celTemperature = response.data.main.temp;
  document.querySelector("#tempNumber").innerHTML = Math.round(celTemperature);
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function displayfahTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNumber");
  celTemp.classList.remove("active");
  fahTemp.classList.add("active");
  let fahrenTemperature = (celTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenTemperature);
}

function displaycelTemperature(event) {
  event.preventDefault();
  celTemp.classList.add("active");
  fahTemp.classList.remove("active");
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = Math.round(celTemperature);
}

let celTemperature = null;

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btnSearch");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahTemp = document.querySelector("#fahTemp");
fahTemp.addEventListener("click", displayfahTemperature);

let celTemp = document.querySelector("#celTemp");
celTemp.addEventListener("click", displaycelTemperature);
