import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = {items : []}

  // Fetch passwords after first mount
  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch('/items')
      .then(res => res.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
}

render() {
this.getItems()
const { items } = this.state;
console.log(items)

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
