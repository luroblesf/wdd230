const apiKey = "6270c8dea1a53b77827b03f82c4bd674";
const lat = 14.8333 ;
const lon = -91.5167;

const urlOpenWeather = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={hourly,minutely,alerts}&appid=${apiKey}`;
const urlWeather= `https://api.openweathermap.org/data/2.5/weather?lat=14.8333&lon=-91.5167&appid=82b9407b7b6d113e077d354c4b29fe74&units=metric`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=14.8333&lon=-91.5167&appid=82b9407b7b6d113e077d354c4b29fe74&units=metric`;

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

/* 3 DAYS */

const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#fig1");

const forecastTemp1 = document.querySelector("#forecast-temp-1");
const weatherIcon1 = document.querySelector("#weather-icon1");
const captionDesc1 = document.querySelector("#fig2");
const forecastday1 = document.querySelector("#forecast-day-1");

const forecastTemp2 = document.querySelector("#forecast-temp-2");
const weatherIcon2 = document.querySelector("#weather-icon2");
const captionDesc2 = document.querySelector("#fig3");
const forecastday2 = document.querySelector("#forecast-day-2");

const forecastTemp3 = document.querySelector("#forecast-temp-3");
const weatherIcon3 = document.querySelector("#weather-icon3");
const captionDesc3 = document.querySelector("#fig4");
const forecastday3 = document.querySelector("#forecast-day-3");

const url = `https://api.openweathermap.org/data/2.5/weather?lat=14.8333&lon=-91.5167&appid=82b9407b7b6d113e077d354c4b29fe74&units=metric`;
const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=14.8333&lon=-91.5167&appid=82b9407b7b6d113e077d354c4b29fe74&units=metric`;

async function weatherapiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data); 
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[1].description;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", "weather icon");
  captionDesc.textContent = `${desc}`;
}

async function forecastapiFetch() {
  try {
    const response = await fetch(url1);
    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayForecast(data) {
  forecastTemp1.innerHTML = `${data.list[6].main.temp.toFixed(0)}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.list[6].weather[0].icon}.png`;
  let desc1 = data.list[6].weather[0].description;
  weatherIcon1.setAttribute("src", iconsrc);
  weatherIcon1.setAttribute("alt", "weather icon");
  captionDesc1.textContent = `${desc1}`;

  forecastTemp2.innerHTML = `${data.list[14].main.temp.toFixed(0)}&deg;F`;
  const iconsrc1 = `https://openweathermap.org/img/w/${data.list[14].weather[0].icon}.png`;
  let desc2 = data.list[14].weather[0].description;
  weatherIcon2.setAttribute("src", iconsrc1);
  weatherIcon2.setAttribute("alt", "weather icon");
  captionDesc2.textContent = `${desc2}`;

  forecastTemp3.innerHTML = `${data.list[22].main.temp.toFixed(0)}&deg;F`;
  const iconsrc2 = `https://openweathermap.org/img/w/${data.list[22].weather[0].icon}.png`;
  let desc3 = data.list[22].weather[0].description;
  weatherIcon3.setAttribute("src", iconsrc2);
  weatherIcon3.setAttribute("alt", "weather icon");
  captionDesc3.textContent = `${desc3}`;
}

function forecastdates() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();
  const todayIndex = currentDate.getDay();

  forecastday1.innerHTML = `${daysOfWeek[(todayIndex + 1) % 7]}`;
  forecastday2.innerHTML = `${daysOfWeek[(todayIndex + 2) % 7]}`;
  forecastday3.innerHTML = `${daysOfWeek[(todayIndex + 3) % 7]}`;
}
weatherapiFetch();
forecastapiFetch();
forecastdates();


window.addEventListener("load", () => {
    let temperatureDegree = document.getElementById("section_one_column_grado");
    let city = document.getElementById("city");
    let map = document.getElementById("map");
    let daysDate = document.getElementById("daysDate");
    let humidityData = document.getElementById("humidityData");
    let atmosphericPressure = document.getElementById(`atmosphericPressure`);
    let windSpeed = document.getElementById("windSpeed");
    let temperatureMax = document.getElementById("temperatureMax");
    let temperatureMin = document.getElementById("temperatureMin");
    let visibility = document.getElementById("visibility");
    let getMapLat = document.getElementById("mapLat");
    let getMapLon = document.getElementById("mapLon");
    let cityForm 
    let searchForm = document.getElementById("searchForm");
    let phrasesWheater = document.getElementById("phrasesWheater")
    let cityPhrasesWheater = document.getElementById("cityPhrasesWheater")


    let humidityDataMobile = document.getElementById("humidityDataMobile");
    let windSpeedMobile = document.getElementById("windSpeedMobile");
    let temperatureMaxMobile = document.getElementById("temperatureMaxMobile");
    let temperatureMinMobile = document.getElementById("temperatureMinMobile");
    let atmosphericPressureMobile = document.getElementById(`atmosphericPressureMobile`);
    let visibilityMobile = document.getElementById("visibilityMobile");


    let randomCityTemp = document.getElementById("randomCityTemp");
    let randomCityName = document.getElementById("randomCityName");
    let randomCityState = document.getElementById("randomCityState");
    let randomCityHumedity = document.getElementById("randomCityHumedity");
    let randomCityPrecise = document.getElementById("randomCityPrecise");
    let randomCitywind = document.getElementById("randomCitywind")
    

    function daysDateContent() {
        setInterval(() => {
        let weekDays  = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dateClassCreation = new Date();
        let executionOfDays = dateClassCreation.getDay()
        daysDate.innerHTML = weekDays[executionOfDays];
        let countDays = 0
        for (let index = 0; index < 3; index++) {
            countDays +=1
            let forecastDay = document.getElementById('forecastDay0'+countDays);
            var daysFilter= ((executionOfDays+=1) > 6) ? weekDays[executionOfDays = 0] : weekDays[executionOfDays];
            forecastDay.innerHTML = daysFilter
        }
           
        }, 1000);
    }
    daysDateContent()



    const getTemperature = (main) => {
        const maxTemp = Math.round(main.temp_max)
        const minTemp = Math.round(main.temp_min)

        return {maxTemp, minTemp};
    }



    function clima(data) {
        cityForm = data.city.name
        console.log(data);
        
        let cityPhrasesWheaterValue = data.city.name
        cityPhrasesWheater.innerText = cityPhrasesWheaterValue
        

        const objPhrases= {
            Clear: "The weather is clear, it's a great day for a walk.",
            Rain:"Remember to bring an umbrella, the weather is rainy.",
            Clouds:"The weather today is cloudy, it is a great day to do physical activity.",
            Snow:"A snowfall is in town, it's time to assemble the snowman.",
        }

        let valuePhrases = objPhrases[data.list[0].weather[0].main]

        phrasesWheater.innerText = `${valuePhrases}`
     
  
        console.log("Experimento");
        console.log(objPhrases.valuePhrases);
        console.log(valuePhrases);



        let temperatureDegreeValor = Math.round(data.list[0].main.temp);
        temperatureDegree.innerHTML = `${temperatureDegreeValor}°`
        city.innerText = data.city.name
        let mapLon = data.city.coord.lon
        let mapLat = data.city.coord.lat
        getMapLat.innerHTML = mapLat;
        getMapLon.innerHTML = mapLon;


        let selector = document.getElementById('section-two-column-two');
        let iframe = document.createElement('iframe');
        

        iframe.setAttribute('src',`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13618.049739807708!2d${mapLon}!3d${mapLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1662869534399!5m2!1ses!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`);
        selector.appendChild(iframe);

        let {humidity, pressure} = data.list[0].main
        humidityData.innerHTML = `${humidity}%`
        humidityDataMobile.innerHTML = `${humidity}%`

        atmosphericPressure.innerHTML = `${pressure} hPa`
        atmosphericPressureMobile.innerHTML = `${pressure} hPa`

        windSpeed.innerHTML = `${data.list[0].wind.speed} km/h`
        windSpeedMobile.innerHTML = `${data.list[0].wind.speed} km/h`

        visibility.innerHTML = `${data.list[0].visibility}`
        visibilityMobile.innerHTML = `${data.list[0].visibility}`

        const {maxTemp, minTemp} = getTemperature(data.list[0].main);
        temperatureMax.innerHTML = `${maxTemp}°`
        temperatureMin.innerHTML = `${minTemp}°`
        temperatureMaxMobile.innerHTML = `${maxTemp}°`
        temperatureMinMobile.innerHTML = `${minTemp}°`

        const icon = data.list[0].weather[0].icon
        iconoClima.src = `assets/animated/${icon}.svg`;

        console.log(iconoClima);
        let countIndex = 0
        for (let index = 1; index < 4; index++) {
            countIndex += 1
            let tempExtendedWeather = document.getElementById('extendedWeather0'+countIndex);
            tempExtendedWeather.innerHTML = Math.round(data.list[countIndex].main.temp)+"°"
            const ExtendedWeatherIco = data.list[countIndex].weather[0].icon
            document.getElementById("iconoClima0"+countIndex).src = `assets/animated/${ExtendedWeatherIco}.svg`;
            let forecastDescriptionExtended= document.getElementById('forecastDescriptionExtended0'+countIndex);
            forecastDescriptionExtended.innerText = data.list[countIndex].weather[0].main
            
        }
        getSysMovementOfSunAndMoon(data)
    }


    function getSysMovementOfSunAndMoon(data){
        let movementOfSunAndMoon = data.list[0].sys.pod

        if(movementOfSunAndMoon == "d"){
            let backgroundDay = document.getElementById("section-two-column-one")
            backgroundDay.style.backgroundImage= 'url("assets/background/day.jpg")';

        }
        else{
            let backgroundNight = document.getElementById("section-two-column-one")
            backgroundNight.style.backgroundImage= 'url("assets/background/night.jpg")';
        }
    }


    

    function getClima(posicion) {
        const {longitude, latitude} = posicion;
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=6752644c4b10d307e40b484055d4f5a5&units=metric`
        fetch(url)
            .then(response => {return response.json()})
            .then(data => {
                clima(data)
            })
            .catch(error => {
                console.log(error)
            })

        console.log(url);
    }

    async function getLocationDefault() {
        const request = await fetch("https://ipinfo.io/json?token=90d44b45827c47")
        const jsonResponse = await request.json()
        const loc = jsonResponse.loc.split(',');
        const coords = {
            latitude: loc[0],
            longitude: loc[1]
        };
        getClima(coords);
        return coords;
    }

    function init() {
        navigator.geolocation.getCurrentPosition(posicion => {
            getClima(posicion.coords)
        }, error => {
            getLocationDefault()
        })
    }

    init()

    function searchFunction(params) {

        params.preventDefault()
        let element  = document.getElementById("section-two-column-two");
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        let contentCity = params.target.nameData.value
        let expReg= new RegExp("[,.;+-1234567890*]","g");
        cityForm = contentCity.replace(expReg, "");
        console.log(cityForm);
        //API

        const URLAPICITY = `https://api.openweathermap.org/data/2.5/forecast?q=${cityForm}&APPID=6752644c4b10d307e40b484055d4f5a5&units=metric`

        fetch(URLAPICITY)
            .then(response=>{return response.json()})
            .then(data=>{
                clima(data)})
                .catch(error=>{
                  console.log(error)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La city colocada no existe... ¡Porfavor inténtelo nuevamente!',
                    background: "#000000ea",
                    color:"#fff",
                    confirmButtonColor: "#161616",
                    width:"40%",
                  })
                })

                console.log(URLAPICITY);
    }


    function getDataRandomCity(data){

        randomCityTemp.innerHTML = `${data.list[0].main.temp}°`
        randomCityName.innerHTML = `${data.city.name}`
        randomCityState.innerHTML = `${data.city.country}`
        randomCityHumedity.innerHTML = `${data.list[0].main.humidity}% Humedity`
        randomCityPrecise.innerHTML = `${data.list[0].main.pressure}hPa pressure`
        randomCitywind.innerHTML = `${data.list[0].wind.speed}km/h wind`
        const randomIconCityValue = data.list[0].weather[0].icon
        RandomIconCity.src = `assets/animated/${randomIconCityValue}.svg`;
        
    }



    function getRandomCity(city) {
        const listCity = ["Buenos Aires", "Japon", "Paris", "Roma", "Nueva York", "Barcelona", "California", "Amsterdam", "Manchester","Madrid", "Pekin", "Moscu", "Estambul"]
        const randomCity = Math.floor(Math.random()*listCity.length)
        const randomUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${listCity[randomCity]}&APPID=6752644c4b10d307e40b484055d4f5a5&units=metric`
        console.log(randomCity)
        console.log("Experimento 3");
        fetch(randomUrl)
            .then(response => {return response.json()})
            .then(data => {
                getDataRandomCity(data)
            })
            .catch(error => {
                console.log(error)
            })

        console.log(randomUrl);
    }

    getRandomCity()


   
    searchForm.addEventListener("submit", searchFunction)


    function navResponsive() {
        const menuItemsClass = document.querySelectorAll(".menu-item-block");
        const menuIconMobile = document.querySelector("#menu-icon-mobile");

        menuIconMobile.addEventListener("click", function () {
            document.body.classList.toggle("mobile-menu-active");
          });


        menuItemsClass.forEach(function (menuItem) {
          menuItem.addEventListener("click", function () {
            document.body.classList.remove("mobile-menu-active");
            let currentItem = document.querySelector(".active");
            currentItem.classList.remove("active");
            this.classList.add("active");
          });
        });
      }
      navResponsive();
      
    
});    