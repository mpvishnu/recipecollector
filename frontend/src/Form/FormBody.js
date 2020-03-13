import React, { Component } from "react";
import "./FormBody.css";
import Recipe from "./Recipe.js";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ReCaptcha } from "react-recaptcha-v3";
import RatingContext from "./rating-context";

let shuffle = require("shuffle-array");
const localIpUrl = require("local-ip-url");
const ipAddress = localIpUrl("public", "ipv4");

class FormBody extends Component {
  constructor(props) {
    super(props);

    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.hide_component = this.hide_component.bind(this);
    this.proceedHandler = this.proceedHandler.bind(this);
    this.backHandler = this.backHandler.bind(this);
    this.aboutHandler = this.aboutHandler.bind(this);

    this.state = {
      recipeName: "",
      rec: [],
      recipeList: [],
      count: 1,
      isVerified: false,
      hide_comp: false,
      recipeMap: [],
      rating: 0,
      submitStatus: false,
      message: "",
      value: "Select Dishes from this list to rate them",
      proceedFlag: false,
      listItem: [],
      aboutFlag: false
    };
  }

  static contextType = RatingContext;

  componentDidMount() {
    axios
      .get("http://3.15.45.199:5000/getrecipes")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            rec: res.data.map(rec => rec.Name)
          });
        }
      })
      .catch(err => console.log(err));
  }

  hide_component = rate => {
    // console.log(this.context.reviews);
  };

  aboutHandler = () => {
    this.setState({
      aboutFlag: this.state.aboutFlag === false ? true : false
    });
  };
  proceedHandler = () => {
    this.setState({
      proceedFlag: true
    });
  };

  backHandler = () => {
    this.setState({
      proceedFlag: false
    });
  };

  onChangeRecipeName(e) {
    this.setState({
      recipeName: e.target.value,
      count: this.state.count + 1,
      recipeList: !this.state.recipeMap.some(r => r === e.target.value)
        ? this.state.recipeList.concat(
            <Recipe
              key={this.state.count}
              parentComponent={this.hide_component}
              rName={e.target.value}
            />
          )
        : this.state.recipeList,
      recipeMap: this.state.recipeMap.concat(e.target.value)
    });
  }

  recaptchaLoaded() {
    // console.log("capcha successfully loaded");
  }

  handleSubmit() {
    if (this.state.isVerified) {
      this.context.emptyResponses = this.context.reviews.filter(value => {
        if (value.rating === 0) {
          return value;
        } else {
          this.context.numResponses = this.context.numResponses + 1;
        }
      });
      if (
        !this.context.emptyResponses.length &&
        this.context.flag &&
        this.context.numResponses >= 5
      ) {
        axios
          .post("http://3.15.45.199:5000/savereview", {
            reviews: this.context.reviews,
            ipAdd: ipAddress
          })
          .then(res => {
            // console.log(res.data)
            this.setState({
              submitStatus: true,
              message: "Your response has been recorded. Thank You.",
              recipeList: []
            });
          })
          .catch(e => {
            // console.log(e);
            this.setState({
              submitStatus: true,
              message: "You have already submitted a response. Thank You!",
              recipeList: []
            });
          });
      } else {
        if (this.context.flag === false) {
          alert("You cannot submit an empty form!");
        } else {
          if (this.context.emptyResponses.length) {
            alert(
              "You have not provided ratings for " +
                this.context.emptyResponses.length +
                " dishes"
            );
          }
          if (this.context.numResponses <= 5) {
            alert("Please provide ratings for a minimum of 5 dishes");
          }
        }
      }
    } else {
      alert("Please verify that you are a human.");
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      });
    }
  }

  render() {
    return (
      <div className="fb1">
        {this.state.proceedFlag === false ? (
          <div className="intro">
            <h3>
              <br />
              Welcome
            </h3>
            <br />
            <p>
              We are Final Year undergraduate students of B.M.S College of
              Engineering, Bengaluru. We are developing a Recommender System,
              which recommends South Indian dishes to the users of our
              application.
            </p>

            <p>
              Your<big style={{ color: "#61dafb" }}> valuable</big> input will
              be very helpful in improving accuracy. It also helps us maintain
              <big style={{ color: "#61dafb" }}> authenticity</big>. There are a{" "}
              <big>100 </big>
              dishes listed in the dropdown menu. Please rate a minimum of{" "}
              <big>5 </big> dishes. There is no limit on the maximum number of
              dishes you can rate.
            </p>
            <br />
            <p>Click on Proceed to start.</p>

            <Button onClick={this.proceedHandler} variant="outline-light">
              Proceed
            </Button>
            <p>
              <br />
            </p>
            <Button onClick={this.aboutHandler} variant="outline-light">
              About Us
            </Button>

            {this.state.aboutFlag ? (
              <div style={{ justifyContent: "center" }}>
                <p>Guide and HOD CSE: Dr.V Umadevi</p>
                <p>Members: Vishnu M P, Praguna Manvi,</p>
                <p>Nitish Vivian Maximus and Parva Chauhan</p>
                <p></p>
              </div>
            ) : null}
          </div>
        ) : null}

        {this.state.message === "" && this.state.proceedFlag ? (
          <div>
            <h5>Select any number of dishes</h5>
            <h6>Click on the dropdown menu below to select the dishes</h6>
            <select
              ref="userInput"
              value={this.state.value}
              required
              onChange={this.onChangeRecipeName}
            >
              {this.state.count === 1 ? shuffle(this.state.rec) : null}
              {this.state.rec.map(function(recipe) {
                return (
                  <option key={recipe} value={recipe}>
                    {recipe}
                  </option>
                );
              })}
            </select>
          </div>
        ) : null}
        {this.state.proceedFlag ? (
          <div className="additionalRecipes">
            {[...this.state.recipeList].reverse().map(recipe => {
              return recipe;
            })}
          </div>
        ) : null}

        {!this.state.submitStatus && this.state.proceedFlag ? (
          <div>
            <div
              style={{
                display: "flex",
                width: "50%",
                margin: "0 auto",
                marginTop: "5",
                justifyContent: "center",
                paddingTop: "100px"
              }}
            >
              <ReCaptcha
                sitekey="6LfPBeEUAAAAAA4wiycKf9i1kIig358n5fN6SA8J"
                action={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />
            </div>

            <div className="ft">
              {this.state.proceedFlag === true ? (
                <Button
                  onClick={this.backHandler}
                  variant="outline-light"
                  size="lg"
                  style={{ paddingRight: "20" }}
                >
                  Back
                </Button>
              ) : null}
              {"  "}
              <Button
                variant="outline-light"
                size="lg"
                onClick={this.handleSubmit}
                disabled={this.state.submitStatus || !this.state.isVerified}
              >
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <p className="message">{this.state.message}</p>
        )}
      </div>
    );
  }
}

export default FormBody;
