import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [temp, setTemp] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [description, setDescription] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let APIkey = "842b36d55cb28eba74a018029d56b04c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
    axios.get(url).then(updateWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function updateWeather(response) {
    setTemp(Math.round(response.data.main.temp));
    setHumidity(Math.round(response.data.main.humidity));
    setDescription(response.data.weather[0].description);
    setWind(Math.round(response.data.wind.speed));
    setIcon(response.data.weather[0].icon);
  }
  if (temp) {
    return (
      <div className="Search">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            onChange={updateCity}
            placeholder="Enter a city..."
            className="searchBar"
          />

          <input type="submit" value="Search" className="btn btn-primary" />
        </form>

        <ul>
          <li>Temperature: {temp}°C</li>
          <li>Description: {description}</li>
          <div className="row">
            <div className="col-6">
              <li>Icon: {icon}</li>
            </div>

            <div className="col-6">
              <li>Humidity: {humidity}%</li>
              <li>Wind: {wind}km/h</li>
            </div>
          </div>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Weather Forecast</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            onChange={updateCity}
            placeholder="Enter a city..."
            className="searchBar"
          />
          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}
