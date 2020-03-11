import React, { Component } from "react";
import "./FormBody.css";
import Recipe from "./Recipe.js";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Recaptcha from "react-recaptcha";
import RatingContext from "./rating-context";

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
      recID: [],
      recipes: [],
      recipeList: [],
      rList: {},
      count: 1,
      isVerified: false,
      hide_comp: false,
      recipeMap: [],
      rating: 0,
      submitStatus: false,
      message: ""
    };
  }

  static contextType = RatingContext;

  componentDidMount() {
    axios
      .get("http://localhost:5000/")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            rec: res.data.map(rec => rec.Name),
            recID: res.data.map(rec => rec._id)
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
        e.target.value !== "Add a Recipe from this list to rate them"
          ? this.state.recipeList.concat(
              <Recipe
                key={this.state.count}
                parentComponent={this.hide_component}
                rName={e.target.value}
              />
            )
          : this.state.recipeList
    });
  }

  recaptchaLoaded = () => {
    // console.log("capcha successfully loaded");
  };

  handleSubmit() {
    axios
      .post("http://localhost:5000/savereview", {
        reviews: this.context.reviews
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
      <div className="fb1" style={{ width: "50%", margin: "0 auto" }}>
        <p>
          <select
            ref="userInput"
            required
            value={this.state.recipeName}
            onChange={this.onChangeRecipeName}
          >
            {this.state.rec.map(function(recipe) {
              return (
                <option key={recipe} value={recipe}>
                  {recipe}
                </option>
              );
            })}
          </select>
        </p>
        <div className="additionalRecipes"> {this.state.recipeList}</div>

        <p style={{ color: "white" }}>
          * Unconfirmed Ratings will not be submitted
        </p>
        {!this.state.submitStatus ? (
          <div>
            <div
              style={{
                display: "flex",
                width: "50%",
                margin: "0 auto",
                justifyContent: "center"
              }}
            >
              <Recaptcha
                sitekey="6LcoAt8UAAAAAO5XRwKcKoGNPPDiyDpvKFMudO-F"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />
            </div>
            <Button
              variant="outline-light"
              size="lg"
              onClick={this.handleSubmit}
              disabled={this.state.submitStatus}
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
