import React, { Component } from 'react';
import './Recipe.css';
import StarRatings from 'react-star-ratings';
import API from '../utils/API'

class Recipe extends Component{
    state = {
        rating: 0,
        apiResponse: "",
        recipeName :""
    }
    constructor(props) {
        super(props)
        
        this.changeRating = this.changeRating.bind(this);
    }

    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
        console.log(newRating);
    }
    
    async componentWillMount() {
        let getResp = await API.get('/', {
            params: {
                recipeID : this.props.rid
            }
        });
        
        this.setState({apiResponse : getResp});
        this.setState({recipeName : this.state.apiResponse.data[0].Name});
        
    }

    render(){
        return(
            <div className="r1">
                {/* Get Ricpe Name from database and display in placeholder */}
                <p>Recipe Name: </p> <h4>{this.state.recipeName}</h4>
                <br/>

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