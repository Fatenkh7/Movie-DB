const mongoose = require("mongoose");
const uri = `mongodb+srv://faten_movies:codimovies@cluster0.blu9d5c.mongodb.net/batata?retryWrites=true&w=majority`;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("Database connection failed");
      console.error(error);
      process.exit(1);
    });
};
