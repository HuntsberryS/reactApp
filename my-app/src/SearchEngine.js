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
    let apiKey = `7036a98t226cf2o3c044afd3b96a58b7`;
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(url).then(updateWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function updateWeather(response) {
    setTemp(Math.round(response.data.temperature.current));
    setHumidity(Math.round(response.data.temperature.humidity));
    setDescription(response.data.condition.description);
    setWind(Math.round(response.data.wind.speed));
    setIcon(response.data.condition.icon);
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
