const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
  },
  {
    collection: "counterCollection"
  }
);
const Counter = mongoose.model("counter", CounterSchema);

module.exports = Counter;
