import React, { Component } from "react";
import "./Recipe.css";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import RatingContext from "./rating-context";

class Recipe extends Component {
  state = {
    rating: 0,
    apiResponse: "",
    recipeName: "",
    showComp: true,
    star: <FontAwesomeIcon icon={faStarOutline} size={"2x"} />,
    starFull: <FontAwesomeIcon icon={faStarFilled} size={"2x"} />,
    rList: [],
    done: false
  };
  constructor(props) {
    super(props);

    this.changeRating = this.changeRating.bind(this);
    this.setFlag = this.setFlag.bind(this);
    this.isDone = this.isDone.bind(this);
  }

  static contextType = RatingContext;

  changeRating(newRating, name) {
    if (!this.state.done) {
      this.setState({
        rating: newRating,
        rList: { rName: this.props.rName, rating: newRating }
      });
      // this.props.parentComponent(newRating)
      // console.log(this.state.rList);
    }
  }

  setFlag = () => {
    this.setState({
      showComp: false,
      rList: []
    });
    this.context.reviews = this.context.reviews.filter(value => {
      if (value.rName !== this.props.rName) {
        return value;
      }
    });
    this.props.parentComponent();
  };

  isDone = () => {
    this.setState({
      done: true
    });
    this.context.reviews.push(this.state.rList);
    this.props.parentComponent();
  };

  render() {
    return (
      <div>
        {this.state.showComp ? (
          <div className="r1" style={{ color: "black" }}>
            <p>Recipe Name: </p> <h4>{this.props.rName}</h4>
            <br />
            <p>Your Ratings:</p>
            {!this.state.done ? (
              <Rating
                fractions={2}
                initialRating={this.state.rating}
                emptySymbol={this.state.star}
                fullSymbol={this.state.starFull}
                onChange={this.changeRating}
              />
            ) : (
              <p>Rating Confirmed: {this.state.rating}</p>
            )}
            <br />
            <div>
              <Button
                className="done_btn"
                onClick={this.isDone}
                variant="link"
                size="sm"
                disabled={this.state.done}
              >
                Confirm Rating
              </Button>
              <Button
                className="del_btn"
                onClick={this.setFlag}
                variant="link"
                size="sm"
              >
                Remove
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Recipe;
