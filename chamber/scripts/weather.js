const apiKey = "0aec6412eede92415f476e7030db63f4";
const lat = 14.83472 ;
const lon = -91.51806;

const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const urlOpenWeather = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={hourly,minutely,alerts}&appid=${apiKey}`;

async function apiFetchWeather(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeatherResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}
apiFetchWeather(urlWeather);

async function apiFetchForecast(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

async function apiFetchOpenWeather(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayOneCallResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}
apiFetchOpenWeather(urlOpenWeather);

function displayWeatherResults(data) {
    const location = document.querySelector("#location");
    const tempArea = document.querySelector(".temp-area");
    const captionDesc = document.querySelector("#weather-description");
    const feelsLike = document.querySelector("#feels-like");
    const windSpeed = document.querySelector("#wind-speed");
    const humidity = document.querySelector("#humidity");

    const weatherIcon = document.createElement("img");
    tempArea.appendChild(weatherIcon);

    const currentTemp = document.createElement("div");
    currentTemp.setAttribute("id", "current-temp");
    tempArea.appendChild(currentTemp);
    location.innerHTML = data.name;
 
    const formattedTemp = data.main.temp.toFixed(0);
    const formattedWindSpeed = data.wind.speed.toFixed(0);

    currentTemp.innerHTML = `${formattedTemp}&deg;F`;
    feelsLike.innerHTML = `${data.main.feels_like.toFixed(0)}&deg;F`;
    windSpeed.innerHTML = `${formattedWindSpeed}mph`;
    humidity.innerHTML = `${data.main.humidity}%`;

    data.weather.forEach((weatherEvent) => {
        const iconsrc = `https://openweathermap.org/img/wn/${weatherEvent.icon}@2x.png`;
        let desc = weatherEvent.description;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", desc);
        weatherIcon.setAttribute("width", "100");
        weatherIcon.setAttribute("height", "100");
        captionDesc.innerHTML = `${desc}`;
    });
    calculateWindChill(formattedTemp, formattedWindSpeed);
}

function displayForecastResults(data) {
    const fiveDayResults = data.list
        .filter((fc) => fc.dt_txt.includes("21:00:00"))
        .map((fc) => {
            const timestamp = fc.dt * 1000;
            return {
                unixTimestamp: timestamp,
                date: dateFormate(timestamp),
                day: dayOfTheWeek(timestamp),
                maxTemp: fc.main.temp_max,
                minTemp: fc.main.temp_min,
                weatherDesc: fc.weather[0].description,
                weatherIcon: fc.weather[0].icon,
                precipChance: fc.pop,
            };
        });

    const forecast = document.querySelector("#forecast");

    fiveDayResults.forEach((day) => {
        const weatherDay = document.createElement("div");
        weatherDay.setAttribute("class", "weather-day");
        const weekDay = document.createElement("h5");
        const weatherFigure = document.createElement("figure");
        const weatherCaption = document.createElement("figcaption");
        const weatherIcon = document.createElement("img");
        const maxTempDiv = document.createElement("div");
        const minTempDiv = document.createElement("div");
        maxTempDiv.setAttribute("class", "temp-div");
        minTempDiv.setAttribute("class", "temp-div");
        const maxTempT = document.createElement("p");
        const minTempT = document.createElement("p");
        const maxTemp = document.createElement("p");
        const minTemp = document.createElement("p");

        weatherDay.appendChild(weekDay);
        weekDay.textContent = day.day;

        weatherDay.appendChild(weatherFigure);
        weatherFigure.appendChild(weatherIcon);
        weatherFigure.appendChild(weatherCaption);

        const iconsrc = `https://openweathermap.org/img/wn/${day.weatherIcon}.png`;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", day.weatherDesc);
        weatherIcon.setAttribute("width", "50");
        weatherIcon.setAttribute("height", "50");
        weatherCaption.innerHTML = `${day.weatherDesc}`;

        weatherDay.appendChild(maxTempDiv);
        maxTempDiv.appendChild(maxTempT);
        maxTempT.textContent = `High:`;
        maxTempDiv.appendChild(maxTemp);
        maxTemp.innerHTML = `${day.maxTemp.toFixed(0)}&deg;F`;

        weatherDay.appendChild(minTempDiv);
        minTempDiv.appendChild(minTempT);
        minTempT.textContent = `Low:`;
        minTempDiv.appendChild(minTemp);
        minTemp.innerHTML = `${day.minTemp.toFixed(0)}&deg;F`;

        forecast.appendChild(weatherDay);
    });
}

function displayOneCallResults(data) {
    const results = data.daily;
    const dailyResults = results.slice(0, 5);
    const forecast = document.querySelector("#forecast");

    dailyResults.forEach((day) => {
        const timestamp = day.dt * 1000;
        let weekday = dayOfTheWeek(timestamp);

        const weatherDay = document.createElement("div");
        weatherDay.setAttribute("class", "weather-day");
        const weekDay = document.createElement("h4");
        const weatherFigure = document.createElement("figure");
        const weatherCaption = document.createElement("figure");
        const weatherIcon = document.createElement("img");
        const maxTempDiv = document.createElement("div");
        const minTempDiv = document.createElement("div");
        maxTempDiv.setAttribute("class", "temp-div");
        minTempDiv.setAttribute("class", "temp-div");
        const maxTempT = document.createElement("p");
        const minTempT = document.createElement("p");
        const maxTemp = document.createElement("p");
        const minTemp = document.createElement("p");

        weatherDay.appendChild(weekDay);
        weekDay.textContent = weekday;

        weatherDay.appendChild(weatherFigure);
        weatherFigure.appendChild(weatherIcon);
        weatherFigure.appendChild(weatherCaption);

        const iconsrc = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", day.weather[0].description);
        weatherIcon.setAttribute("width", "50");
        weatherIcon.setAttribute("height", "50");
        weatherCaption.innerHTML = `${day.weather[0].description}`;

        weatherDay.appendChild(maxTempDiv);
        maxTempDiv.appendChild(maxTempT);
        maxTempT.textContent = `High:`;
        maxTempDiv.appendChild(maxTemp);
        maxTemp.innerHTML = `${day.temp.max.toFixed(0)}&deg;F`;

        weatherDay.appendChild(minTempDiv);
        minTempDiv.appendChild(minTempT);
        minTempT.textContent = `Low:`;
        minTempDiv.appendChild(minTemp);
        minTemp.innerHTML = `${day.temp.min.toFixed(0)}&deg;F`;

        forecast.appendChild(weatherDay);
    });
}

function dayOfTheWeek(timestamp) {
    const options = {
        weekday: "long",
    };
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", options);
}

function dateFormate(timestamp) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "Quetzaltenango/Guatemala",
        timeZoneName: "short",
    };
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", options);
}