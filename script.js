let cityEl = document.querySelector(".city");

let iconEl = document.querySelector(".icon");

let descriptionEl = document.querySelector(".description");

let temperatureEl = document.querySelector(".temp");

let humidityEl = document.querySelector(".humidity");

let windEl = document.querySelector(".wind");

let searchBar = document.querySelector(".search-bar");

let searchEl = document.querySelector(".search button");

let weatherEl = document.querySelector(".weather");

let weather = {
 "apikey": "f991dc5794d6cad52ba443dd3a9eb8d3",

 fetchWeather: function (city) {
  fetch("http://api.weatherapi.com/v1/current.json?key=a6f6fef1470f473cb0694459230605%20&q=" + city + "&aqi=no").then((response) => response.json()).then((data) => this.displayWeather(data));
 },

 displayWeather: function (data) {
    const { name } = data.location;
    const { icon, text } = data.current.condition;
    const { temp_c, humidity } = data.current;
    const { wind_kph } = data.current;

    cityEl.innerText = `Weather in ${name}`;
    iconEl.src = icon;
    descriptionEl.innerText = text;
    temperatureEl.innerText = `Temperature: ${temp_c}°C`;
    humidityEl.innerText = `Humidity: ${humidity}%`;
    windEl.innerText = `Wind Speed: ${wind_kph} km/hr`;

    weatherEl.classList.remove("loading");

    // Determine the background GIF based on the weather condition
    let backgroundGif = "";
    const condition = text.toLowerCase();
    if (condition.includes("sunny")) {
        backgroundGif = `https://source.unsplash.com/1600x900/?${name},sunny`;
    } else if (condition.includes("rain") || condition.includes("showers") || condition.includes("drizzle")) {
        backgroundGif = `https://source.unsplash.com/1600x900/?${name},rain`;
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
        backgroundGif = `https://source.unsplash.com/1600x900/?${name},cloudy`;
    } else if (condition.includes("snow")) {
        backgroundGif = `https://source.unsplash.com/1600x900/?${name},snow`;
    } else if (condition.includes("storm") || condition.includes("thunder") || condition.includes("lightning")) {
        backgroundGif = `https://source.unsplash.com/1600x900/?${name},storm`;
    } else {
        backgroundGif = `https://source.unsplash.com/1600x900/?${name}`;
    }

    document.body.style.backgroundImage = `url('${backgroundGif}')`;
},

 search: function () {
  this.fetchWeather(searchBar.value);
 }
};

searchEl.addEventListener("click", () => {
 console.log("Clicked!");
 weather.search();
});

searchBar.addEventListener("keyup", (event) => {
 if (event.key === "Enter") {
  weather.search();
 }
});

weather.fetchWeather("Hyderabad");