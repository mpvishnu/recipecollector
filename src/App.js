import React, { Component } from 'react';
import FormBody from './Form/FormBody.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>RATE OUR RECIPES!</h1>
        <FormBody />
      </div>
    );
  }
}

export default App;
