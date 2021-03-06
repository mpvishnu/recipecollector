const router = require("express").Router();
let Recipe = require("../models/recipe.js");

router.route("/").get((req, res) => {
  let rid = req.query.recipeID;
  if (rid) {
    Recipe.find({ RecipeID: rid }, { _id: 0, Name: 1 })
      .then(recipes => res.json(recipes))
      .catch(err => res.status(400).json("Error: " + err));
  } else {
    Recipe.find({}, { _id: 0, Name: 1 })
      .then(recipes => res.json(recipes))
      .catch(err => res.status(400).json("Error: " + err));
  }
});

// router.route('/add').post((req, res) => {
//     const RecipeID = Number(req.body.RecipeID);
//     const Name = req.body.Name;
//     const Ingredients = req.body.Ingredients;
//     const Method = req.body.Method;
//     const Preparation = req.body.Preparation;
//     const Category = req.body.Category;

//     const newRecipe = new Recipe({
//       RecipeID,
//       Name,
//       Ingredients,
//       Method,
//       Preparation,
//       Category,
//     });

//     newRecipe.save()
//     .then(() => res.json('Recipe added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
//   });

module.exports = router;
