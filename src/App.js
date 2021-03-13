import './App.scss';
import React, { Component } from 'react';
import Cards from './components/Cards';

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
