import React, { Component } from "react";
import FormBody from "./Form/FormBody.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>RATE YOUR FAVORITE DISHES!</h1>
        <h5 style={{ color: "white" }}>
          Click confirm once you are confident with your rating..
        </h5>
        <h6 style={{ color: "white" }}>
          We know that choosing among your favorites can be difficult :)
        </h6>
        <FormBody />
      </div>
    );
  }
}

export default App;
