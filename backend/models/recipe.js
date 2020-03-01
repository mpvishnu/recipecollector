const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    RecipeID: { type: Number},
    Name: { type: String },
    Ingredients: { type: String },
    Method: { type: String },
    Preparation: { type: String },
    Category:{type: String},
},{
    collection:'south_Indian_recipes'
});

const Recipe = mongoose.model('Recipes', recipeSchema);

module.exports = Recipe;