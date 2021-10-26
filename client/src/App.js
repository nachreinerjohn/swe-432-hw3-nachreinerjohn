import React, { Component, useState, useRef } from 'react';
import './App.css';

class Display extends React.Component{
  render(){
    return(
      <>
        <tr>
          <td>{this.props.item.name}</td>
          <td>{this.props.item.rarity}</td>
          <td>{this.props.item.type}</td>
        </tr>
      </>
    );
  }
}

class List extends React.Component{
  render(){
    return(
      <>
          <table>
          <thead>
              <tr>
                <th>name</th>
                <th>Rarity</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map(item =>(
                <Display key={item.name} item={item}/>
              ))}
            </tbody>
          </table>
      </>
    );
  }
}

class Paragraph extends React.Component{
  render(){
    return (
      <>
        <p>
          <b><i>{this.props.name}</i></b>: 
          {this.props.description}
        </p>
      </>
    )
  }
}

// function ItemSearch(props){
//   const itemNameRef = useRef()

//   function handleItemSearch(e){
//     const itemName = itemNameRef.current.value
//     let item;
//     fetch('/items/' + itemName)
//     .then(res => item = res.json())
//     .catch(err => console.log(err))

//     return(item)
//   }
//   return(
//     <>
//       <input ref={itemNameRef} type="text"/>
//       <button onClick={handleItemSearch} search/>
//     </>
//   )
// }

class App extends React.Component {
  // Initialize state
  state = {items : []}

  // Fetch passwords after first mount
  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch('/items/detailed')
      .then(res => res.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
}

render() {
const { items } = this.state;

    return (
      <div className="App">
            <List items={items}/>

            <h1>Descriptions</h1>

            {items.map(item =>(
              <Paragraph key={item.name} name={item.name} description={item.description} />
            ))}
            {/* {ItemSearch(items)} */}
      </div>
      );    
  }
}


export default App;
