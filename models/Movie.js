const mongoose = require("mongoose");
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2100,
  },
  rating: {
    type: Number,
    default: 4,
    min: 0,
    max: 10,
  },
});
module.exports = mongoose.model("movies", movieSchema);
