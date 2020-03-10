const mongoose = require("mongoose");
let Counter = require("./counter.js");

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
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: "entityId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then(function(count) {
      console.log("...count: " + JSON.stringify(count));
      doc.ReviewID = count.seq;
      next();
    })
    .catch(function(error) {
      console.error("counter error-> : " + error);
      throw error;
    });
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
