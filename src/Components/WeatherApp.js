import React from "react";
import axios from "axios";
import VibingCat from "../Pictures/vibingcat.gif";

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      country: "",
      weather: "",
      weatherDescription: "",
      humidity: 0,
      weatherIcon: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const countryToFind = this.state.input;
    axios
      .get(`https://restcountries.com/v3.1/name/${countryToFind}`)
      .then((data) => {
        const [lat, lon] = data.data[0].latlng;
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
        );
      })
      .then((data2) => {
        const country = data2.data.name;
        const weather = data2.data.weather[0].main;
        const weatherDescription = data2.data.weather[0].description;
        const temperature = data2.data.main.temp;
        const humidity = data2.data.main.humidity;
        const pictureId = data2.data.weather[0].icon;
        this.setState({
          country: country,
          weather: weather,
          weatherDescription: weatherDescription,
          temperature: temperature,
          humidity: humidity,
          weatherIcon: pictureId,
        });
      })
      .catch((error) => {
        console.log(`${error}, Cannot find Data using '${countryToFind}'`);
      });
    this.setState({
      input: "",
    });
  };
  render() {
    const link = `https://openweathermap.org/img/wn/${this.state.weatherIcon}@2x.png`;
    return (
      <div>
        <div>ABEL's WEATHER REPORT!</div>
        <div>
          <img src={VibingCat} alt="cat"></img>
        </div>
        <div>
          <input
            type="text"
            value={this.state.input}
            onChange={(e) => this.handleChange(e)}
            placeholder="input Country Here!"
          />
          <input type="submit" value="submit" onClick={this.handleSubmit} />
        </div>
        {this.state.humidity !== 0 ? (
          <div>
            <div>{this.state.country}'s Weather Report!</div>
            <div>
              Temperature: {this.state.temperature}°C. Humidity:{" "}
              {this.state.humidity}%
            </div>
            <div>
              Weather: {this.state.weather} Description:{" "}
              {this.state.weatherDescription}
            </div>
            <img src={link} alt="weathericon" />
          </div>
        ) : null}
      </div>
    );
  }
}
