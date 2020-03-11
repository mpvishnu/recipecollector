const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let Recipe = require("./models/recipe.js");
let Review = require("./models/review.js");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("Connected to MongoDB ATLAS Successfully... !");
// });

connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// const recipeRouter = require('./routes/getrecipe.js');
// app.use('/getrecipe', recipeRouter);

app.get("/", (req, res) => {
  let rid = req.query.recipeID;
  if (rid) {
    Recipe.find({ RecipeID: rid }, { _id: 0, Name: 1 })
      .then(recipes => res.json(recipes))
      .catch(err => res.status(400).json("Error: " + err));
  } else {
    console.log("GET Request Detected...!");
    Recipe.find({}, { _id: 1, Name: 1 })
      // .then(recipes => console.log(recipes))
      .then(recipes => res.json(recipes))
      .catch(err => res.status(400).json("Error: " + err));
  }
});

app.post("/savereview", (req, res) => {
  let ipAdd = req.connection.remoteAddress;
  const reviews = req.body.reviews;
  //   console.log(reviews);
  //   console.log("IP Address of the user" + ipAdd);

  const newReview = new Review({ ipAdd, reviews });
  newReview
    .save()
    .then(() => res.json("Review added!"))
    .catch(err => res.status(400).json("Error: 400"));
  //res.json("Stored The recipe review")
});

app.listen(port, () => {
  console.log(`Server is running ...! on port : ${port}`);
});
