import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

export default function SearchEngine() {
  let [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=842b36d55cb28eba74a018029d56b04c&units=metric`;
    axios.get(url).then(showWeather);
    alert(`${city}`);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function Weather(props) {
    let [temp, setTemp] = useState(null);
    let [humidity, setHumidity] = useState(null);
    let [description, setDescription] = useState(null);
    let [wind, setWind] = useState(null);
    let [icon, setIcon] = useState(null);
    let [text, setText] = useState(null);

    function showWeather(response) {
      setTemp(Math.round(response.data.main.temp));
      setHumidity(Math.round(response.data.main.humidity));
      setDescription(response.data.weather[0].description);
      setWind(Math.round(response.data.wind.speed));
      setIcon(response.data.weather[0].icon);

      return (
        <div className="weather">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-9">
                <input
                  type="search"
                  onChange={updateCity}
                  placeholder="enter a city..."
                  className="searchBar"
                />
              </div>
              <div className="col-3">
                <input
                  type="submit"
                  value="search"
                  className="btn btn-primary"
                />
              </div>
            </div>
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
    }
  }
}
