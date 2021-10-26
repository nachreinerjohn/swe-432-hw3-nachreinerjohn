import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  // Initialize state
  constructor(props){
    super(props);

    this.state = {
      Items : []
    }
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch('/')
      .then(res => res.json())
      .then(Items => this.setState({
        Items : Items,
      }));
}

render() {
const {items} = this.state;

    return (
      <div className="App">
        {/* Render the cities*/}
          <div>
            <h1>Items</h1>
            <ul className="items">
              {items.map((item, index) =>
                <li key={index}>
                  {item}
                </li>
              )}
            </ul>
          </div>
          </div>
      );    
  }
}


export default App;
