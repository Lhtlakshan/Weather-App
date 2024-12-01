let btnCurrent = document.getElementById("btnCurrent");
let btnForecast = document.getElementById("btnForecast");
let btnHistory = document.getElementById("btnHistory");

let box2 = document.getElementById("box2");

let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("windSpeed");
let discription = document.getElementById("weatherDes");
let condition = document.getElementById("condition");
let place = document.getElementById("area");

function currentWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((area) => {
      let latitude = area.coords.latitude;
      let longitude = area.coords.longitude;
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=278b2f0bf4df4a3988b75530240309&q=${latitude},${longitude}&aqi=yes`
      )
        .then((res) => res.json())
        .then((data) => {
          place.innerHTML = data.location.name;
          condition.innerHTML = `<img id="condition" src="${data.current.condition.icon}" alt="condition img">`;

          function updateWindSpeed() {
            if (speedUnit.value === "kph") {
              wind.innerHTML = data.current.wind_kph;
            } else {
              wind.innerHTML = data.current.wind_mph;
            }
          }

          function updateTemperature() {
            if (tempUnit.value === "celsius") {
              temperature.innerHTML = data.current.temp_c;
            } else {
              temperature.innerHTML = data.current.temp_f;
            }
          }

          updateTemperature();
          updateWindSpeed();

          humidity.innerHTML = data.current.humidity + "%";
          discription.innerHTML = data.current.condition.text;

          tempUnit.addEventListener("change", () => {
            updateTemperature();
          });

          speedUnit.addEventListener("change", () => {
            updateWindSpeed();
          });
        });

      let table = document.getElementById("tblWeatherForecast");
      let body = `<tr>
                <th>Date</th> 
                <th>Average Temperature(°C)</th>
                <th>Average Humidity(%)</th>
                <th>Max wind speed(kmph)</th>
                <th>Condition</th>
                <th>weather description</th> 
              </tr>`;

      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=278b2f0bf4df4a3988b75530240309&q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes`
      )
        .then((res) => res.json())
        .then((data) => {
          data.forecast.forecastday.forEach((element) => {
            body += `<tr>
                    <td>${element.date}</td>
                    <td>${element.day.avgtemp_c}</td>
                    <td>${element.day.avghumidity}</td>
                    <td>${element.day.maxwind_kph}</td>
                    <td><img src="${element.day.condition.icon}" alt="condition img" id="condition"></td>
                    <td>${element.day.condition.text}</td>
                  </tr>`;
          });
          table.innerHTML = body;
        })
        .catch((err) => {
          alert("Location not found!!! Please enter valid location" + err);
        });
    });
  }
}

currentWeather();

function weatherforSearchLocation(location) {
  //current weather
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=278b2f0bf4df4a3988b75530240309&q=${location}&aqi=yes`
  )
    .then((res) => res.json())
    .then((data) => {
      place.innerHTML = data.location.name;
      condition.innerHTML = `<img id="condition" src="${data.current.condition.icon}" alt="condition img">`;

      function updateWindSpeed() {
        if (speedUnit.value === "kph") {
          wind.innerHTML = data.current.wind_kph;
        } else {
          wind.innerHTML = data.current.wind_mph;
        }
      }

      function updateTemperature() {
        if (tempUnit.value === "celsius") {
          temperature.innerHTML = data.current.temp_c;
        } else {
          temperature.innerHTML = data.current.temp_f;
        }
      }

      updateTemperature();
      updateWindSpeed();

      humidity.innerHTML = data.current.humidity + "%";
      discription.innerHTML = data.current.condition.text;

      tempUnit.addEventListener("change", () => {
        updateTemperature();
      });

      speedUnit.addEventListener("change", () => {
        updateWindSpeed();
      });
    });

  //Forecast weather
  let table = document.getElementById("tblWeatherForecast");
  let body = `<tr>
                <th>Date</th> 
                <th>Average Temperature(°C)</th>
                <th>Average Humidity(%)</th>
                <th>Max wind speed(kmph)</th>
                <th>Condition</th>
                <th>weather description</th> 
              </tr>`;

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=278b2f0bf4df4a3988b75530240309&q=${location}&days=7&aqi=yes&alerts=yes`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forecast.forecastday.forEach((element) => {
        body += `<tr>
                    <td>${element.date}</td>
                    <td>${element.day.avgtemp_c}</td>
                    <td>${element.day.avghumidity}</td>
                    <td>${element.day.maxwind_kph}</td>
                    <td><img src="${element.day.condition.icon}" alt="condition img" id="condition"></td>
                    <td>${element.day.condition.text}</td>
                  </tr>`;
      });
      table.innerHTML = body;
    })
    .catch((err) => {
      alert("Location not found!!! Please enter valid location" + err);
    });
}
let inputLocation = document.getElementById("location");

btnCurrent.addEventListener("click", () => {
  weatherforSearchLocation(inputLocation.value);
});

//historical weather
let date = document.getElementById("date");

let today = new Date();

let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

let currentDate = `${day}-${month}-${year}`;

function historicalWeather(location, date) {
  if (!(date === "" && location === "" && date < currentDate)) {
    let table = document.getElementById("tblWeatherHistorical");
    let body = `<tr>
                <th>Date</th> 
                <th>Average Temperature(°C)</th>
                <th>Average Humidity(%)</th>
                <th>Max wind speed(kmph)</th>
                <th>Condition</th>
                <th>weather description</th> 
              </tr>`;
    fetch(
      `https://api.weatherapi.com/v1/history.json?key=278b2f0bf4df4a3988b75530240309&q=${location}&dt=${date}`
    ) //this could not be done as the api does not support historical weather data. it is not a free version
      .then((res) => res.json())
      .then((data) => {
        console.log(data.forecast.forecastday);
        data.forecast.forecastday.forEach((element) => {
          body += `<tr>
                    <td>${element.date}</td>
                    <td>${element.day.avgtemp_c}</td>
                    <td>${element.day.avghumidity}</td>
                    <td>${element.day.maxwind_kph}</td>
                    <td><img src="${element.day.condition.icon}" alt="condition img" id="condition"></td>
                    <td>${element.day.condition.text}</td>
                  </tr>`;
        });
        table.innerHTML = body;
      })
      .catch((err) => {
        alert(
          "Date and location hould not be empty and date should be less than current date for Historical Weather" +
            err
        );
      });
  } else {
    alert("Please enter valid location and date");
  }
}

btnHistory.addEventListener("click", () => {
  historicalWeather(inputLocation.value, date.value);
});
