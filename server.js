const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let Recipe = require("./models/recipe.js");
let Review = require("./models/review.js");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.get("/", (req, res) => {
  res.json({ content: "HELLO FROM SERVER!" });
});

app.get("/getrecipes", (req, res) => {
  let rid = req.query.recipeID;
  if (rid) {
    Recipe.find({ RecipeID: rid }, { _id: 0, Name: 1 })
      .then(recipes => res.json(recipes))
      .catch(err => res.status(400).json("Error: " + err));
  } else {
    console.log("GET Request Detected...!");
    Recipe.find({}, { _id: 1, Name: 1 })
      .then(recipes => res.json(recipes))
      .catch(err => res.status(400).json("Error: " + err));
  }
});

app.post("/savereview", (req, res) => {
  let ipAdd = req.connection.remoteAddress;
  const reviews = req.body.reviews;

  const newReview = new Review({ ipAdd, reviews });
  newReview
    .save()
    .then(() => res.json("Review added!"))
    .catch(err => res.status(400).json("Error: 400"));
});

app.listen(port, () => {
  console.log(`Server is running ...! on port : ${port}`);
});
