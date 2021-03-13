import logo from './logo.svg';
import './App.scss';
import React, { Component } from 'react';
import Cards from './components/Cards';




// handleComment() {

// }


class App extends Component {
  state = {
    people: []
  }

  

  render() {
    return (
      <div className="App">
        <Cards/>
      </div>
    );
  }
}

export default App;
