let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
todaysTime.innerHTML = `${day}, ${hours}:${minutes}`;

//Search Weather
function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#currentC").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let unit = "metric";
  let apiKey = "a2baf84f083b88654c8b1aba441c30ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "a2baf84f083b88654c8b1aba441c30ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchField").value;
  searchCity(city);
}
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Oslo");

//function changeF(event) {
// event.preventDefault();
// let temp = document.querySelector("#currentC");
// temp.innerHTML = Math.round((18 * 9) / 5 + 32);
//}
//function changeC(event) {
//  event.preventDefault();
//  let temp = document.querySelector("#currentC");
//  temp.innerHTML = 18;
//}

//let tempF = document.querySelector("#fahrenheit");
//tempF.addEventListener("click", changeF);
//let tempC = document.querySelector("#celsius");
//tempC.addEventListener("click", changeC);
