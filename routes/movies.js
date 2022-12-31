const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

//get all the movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ data: movies });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//get specific movie by id
router.get("/ID/:ID", async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.ID);
    res.status(200).json({ data: movies });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//get movies by title
router.get("/by-title", async (req, res) => {
  try {
    let sortBy = "title";
    moviesByTitle = await Movie.find({}).sort({ [sortBy]: 1 });
    res.status(200).json({ data: moviesByTitle });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//get movies by rating
router.get("/by-rating", async (req, res) => {
  try {
    let sortBy = "rating";
    moviesByRating = await Movie.find({}).sort({ [sortBy]: 1 });
    res.status(200).json({ data: moviesByRating });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//get movies by date
router.get("/by-year", async (req, res) => {
  try {
    let sortBy = "year";
    moviesByYear = await Movie.find({}).sort({ [sortBy]: 1 });
    res.status(200).json({ data: moviesByYear });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//create movie
router.post("/", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
  });
  try {
    const savedMovie = await movie.save();
    res.status(200).json({ data: savedMovie });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//delete movie by id
router.delete("/:ID", async (req, res) => {
  try {
    const removeMovie = await Movie.remove({ _id: req.params.ID });
    res.status(200).json({ data: removeMovie });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//update movie
router.patch("/:ID", async (req, res) => {
  try {
    const updateMovie = await Movie.updateOne(
      { _id: req.params.ID },
      { $set: { title: req.body.title, rating: req.body.rating } }
    );
    res.status(200).json({ data: updateMovie });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
