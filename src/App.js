import React from "react";
import "./App.css";
import WeatherApp from "./Components/WeatherApp";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <WeatherApp />
        </header>
      </div>
    );
  }
}

export default App;
