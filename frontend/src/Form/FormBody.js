import React, { Component } from "react";
import "./FormBody.css";
import Recipe from "./Recipe.js";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Recaptcha from "react-recaptcha";
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
      value: "Select Dishes from this list to rate them"
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

  onChangeRecipeName(e) {
    this.setState({
      recipeName: e.target.value,
      count: this.state.count + 1,
      recipeList:
        // e.target.value !== "Add a Recipe from this list to rate them"?
        this.state.recipeList.concat(
          <Recipe
            key={this.state.count}
            parentComponent={this.hide_component}
            rName={e.target.value}
          />
        )
      // : this.state.recipeList
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
        }
      });

      if (!this.context.emptyResponses.length && this.context.flag) {
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
          alert(
            "You have not provided ratings for " +
              this.context.emptyResponses.length +
              " dishes"
          );
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
        {this.state.message === "" ? (
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
        ) : null}
        <div className="additionalRecipes"> {this.state.recipeList}</div>

        {!this.state.submitStatus ? (
          <div>
            <div
              style={{
                display: "flex",
                width: "50%",
                margin: "0 auto",
                marginTop: "5",
                justifyContent: "center",
                paddingTop: "200px"
              }}
            >
              <Recaptcha
                sitekey="6Lfe2OAUAAAAAAC9SEZeidHzoj5O8ahY5PByxOiZ"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />
            </div>
            <p style={{ color: "white" }}>
              * Please click on "I'm not a robot" to verify before submitting.
            </p>
            <Button
              variant="outline-light"
              size="lg"
              onClick={this.handleSubmit}
              disabled={this.state.submitStatus || !this.state.isVerified}
            >
              Submit
            </Button>
          </div>
        ) : (
          <p className="message">{this.state.message}</p>
        )}
      </div>
    );
  }
}

export default FormBody;
