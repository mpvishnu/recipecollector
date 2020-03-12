import React, { Component } from "react";
import FormBody from "./Form/FormBody.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="heading"> */}
        <h1>RATE YOUR FAVORITE DISHES!</h1>
        <h5>Select any number of dishes</h5>
        <h6>Click on the dropdown menu below to add dishes</h6>
        {/* </div> */}
        <FormBody />
      </div>
    );
  }
}

export default App;
