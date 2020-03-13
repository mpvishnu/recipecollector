import React, { Component } from "react";
import FormBody from "./Form/FormBody.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadReCaptcha } from "react-recaptcha-v3";

class App extends Component {
  componentDidMount() {
    loadReCaptcha("6LfPBeEUAAAAAA4wiycKf9i1kIig358n5fN6SA8J");
  }
  render() {
    return (
      <div className="App">
        {/* <div className="heading"> */}
        <h1>RATING COLLECTOR</h1>

        {/* </div> */}
        <FormBody />
      </div>
    );
  }
}

export default App;
