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

function searchNewCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let cityInput = document.querySelector("#searchinput");
  cityName.innerHTML = `${cityInput.value}`;
}
let searchCity = document.querySelector("#search");
searchCity.addEventListener("submit", searchNewCity);

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
let cLink = document.querySelector("#celTemp");
cLink.addEventListener("click", convertC);
let fLink = document.querySelector("#fahTemp");
fLink.addEventListener("click", convertF);

let apiKey = "60c52e9588bed9478b2ad668f1ee55d2";
console.log(apiKey);

function displayWeatherCondition(response) {
  let apiKey = "16349f381dfaa3ea072aee8c62fc1b3b";
  let units = "metric";
  let SearchResult = document.querySelector("#searchinput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${SearchResult}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempNumber").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function SearchCity(city) {
  let apiKey = `9b17ad7a8e9bb4a84d31521ba60a3369`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchinput").value;
  SearchCity(city);
}

function retrievePosition(position) {
  let apiKey = "9b17ad7a8e9bb4a84d31521ba60a3369";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let citynew = document.querySelector("#search");
citynew.addEventListener("submit", SearchCity);

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btnSearch");
currentLocationButton.addEventListener("click", getCurrentLocation);
