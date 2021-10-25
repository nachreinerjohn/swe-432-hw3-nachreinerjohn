import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { cities: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getCities();
  }

  getCities() {
    fetch('/cities')
      .then(res => res.json())
      .then(cities => this.setState({ cities }));
}

render() {
const { cities } = this.state;

    return (
      <div className="App">
        {/* Render the cities*/}
          <div>
            <h1>Cities</h1>
            <ul className="cities">
              {cities.map((city, index) =>
                <li key={index}>
                  {city}
                </li>
              )}
            </ul>
          </div>
          </div>
      );    
  }
}


export default App;
