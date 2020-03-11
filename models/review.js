const mongoose = require("mongoose");
let Counter = require("./counter.js");

let flag = true;
const reviewSchema = mongoose.Schema(
  {
    ReviewID: { type: Number },
    ipAdd: { type: String },
    reviews: { type: Array }
  },
  {
    collection: "south_Indian_Reviews"
  }
);

mongoose.set("useFindAndModify", false);

reviewSchema.pre("save", function(next) {
  const self = this;
  Review.find({ ipAdd: self.ipAdd }, function(err, docs) {
    if (!docs.length) {
      // next();
      Counter.findByIdAndUpdate(
        { _id: "entityId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      )
        .then(function(count) {
          // console.log("...count: " + JSON.stringify(count));
          self.ReviewID = count.seq;
          next();
        })
        .catch(function(error) {
          // console.error("counter error-> : " + error);
          throw error;
        });
    } else {
      // console.log("Response already exists: ", self.ipAdd);
      flag = false;
      next(new Error("Response submitted!"));
    }
  });
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
