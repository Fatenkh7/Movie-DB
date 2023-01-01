const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 10,
    max: 25,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 50,
  },
});
module.exports = mongoose.model("users", userSchema);
