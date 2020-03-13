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
    star: <FontAwesomeIcon icon={faStarOutline} size={"3x"} />,
    starFull: <FontAwesomeIcon icon={faStarFilled} size={"3x"} />,
    done: false
  };
  constructor(props) {
    super(props);

    this.changeRating = this.changeRating.bind(this);
    this.setFlag = this.setFlag.bind(this);
    // this.isDone = this.isDone.bind(this);
  }

  static contextType = RatingContext;

  componentDidMount() {
    this.context.reviews.push({ rName: this.props.rName, rating: 0 });
    this.context.flag = true;
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    });
    this.context.reviews = this.context.reviews.filter(value => {
      if (value.rName === this.props.rName) {
        value.rating = newRating;
        return value;
      } else {
        return value;
      }
    });
  }

  setFlag = () => {
    this.setState({
      showComp: false
    });
    this.context.reviews = this.context.reviews.filter(value => {
      if (value.rName !== this.props.rName) {
        return value;
      }
    });
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
            <Button
              className="del_btn"
              onClick={this.setFlag}
              variant="link"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Recipe;
