let weather = {
    apiKey: "5019af3acb89b8fd82f5f799f72df979",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => {
                this.displayWeather(data);
                this.fetchAirQuality(data.coord.lat, data.coord.lon);
            });
    },
    fetchAirQuality: function (lat, lon) {
        fetch(
            "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No air quality found.");
                    throw new Error("No air quality found.");
                }
                return response.json();
            })
            .then((data) => this.displayAirQuality(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    displayAirQuality: function (data) {
        const { aqi } = data.list[0].main;
        document.querySelector(".aqi").innerText = "Air Quality: " + aqi;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Dehradun");

function updateClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = days[now.getDay()];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = months[now.getMonth()];
    var date = now.getDate();
    var year = now.getFullYear();
    var timeString = hours + ':' + minutes + ':' + seconds;
    var dayString = day;
    var dateString = month + ' ' + date + ', ' + year;
    document.getElementById('clock').innerHTML = timeString + '<br>' + dayString + '<br>' + dateString;
}
setInterval(updateClock, 1000);

