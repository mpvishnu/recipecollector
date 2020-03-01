import React, { Component } from 'react';
import './Recipe.css';
import StarRatings from 'react-star-ratings';

class Recipe extends Component{
    constructor(props) {
        super(props)
        this.state = {
            rating: 0
        //   starsSelected: 0
        }
        this.changeRating = this.changeRating.bind(this);
    }
    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });

        console.log(this.state.rating);
    }
    render(){
        return(
            <div className="r1">
                {/* Get Ricpe Name from database and display in placeholder */}
                <h4>Recipe Name: {this.props.rid}</h4>

                {/* Placeholder for Ratings widget */}
                <p>Your Ratings:</p>
                <StarRatings
                    rating={this.state.rating}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                />
            </div>
        );
    }
}


export default Recipe;