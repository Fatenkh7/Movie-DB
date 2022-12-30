const express = require("express");
const app = express();
const port = 3000;
const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

app.get("/", (req, res) => {
  res.send("ok");
});

//testing route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "ok" });
});

//timer router
app.get("/time", (req, res) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  res.status(200).json({ message: `${hours} : ${minutes}` });
});

//Api
app.get("/hello/%3CID%3E", (req, res) => {
  const ID = req.params.id || "world";
  res.status(200).json({ message: `Hello, ${ID}` });
});

//search router
app.get("/search", (req, res) => {
  console.log(req.query.s);
  if (typeof req.query.s == "undefined" || req.query.s === "") {
    res.send({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
  } else {
    res.send({ status: 200, message: "ok", data: req.query.s });
  }
});

//movies

//create movies
app.get("/movies/create/title=:TITLE&year=:YEAR&rating=:RATING", (req, res) => {
  let newMovie = {
    title: req.params.TITLE,
    year: req.params.YEAR,
    rating: parseInt(req.params.RATING),
  };
  if (typeof req.params.YEAR == "undefiend" || req.params.YEAR.length !== 4) {
    res.status(403).json({
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
  } else if (typeof req.params.TITLE == "undefined") {
    res.status(403).json({
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
  } else if (
    req.params.RATING == null ||
    req.params.RATING != parseInt(req.params.RATING)
  ) {
    req.params.RATING = 4;
  } else {
    movies.push(newMovie);
    res.status(200).json({ message: "done", data: newMovie });
  }
});

//edit movies
app.get("/movies/edit", (req, res) => {
  res.status(200).json({ message: "done" });
});

//delete movies
app.get("/movies/delete/:ID", (req, res) => {
  movies.find((movie) => {
    var deleteMovie = req.params.ID;
    // let newList !== movies[req.params.ID];
    if (deleteMovie > movie.length || deleteMovie == "undifined") {
      res.status(404).json({
        error: true,
        message: `the movie ${deleteMovie} does not exist`,
      });
    } else if (deleteMovie) {
      movies.splice(req.params.ID - 1, 1);
      // newLi = movies.splice(deleteMovie, 1);
      // var newm = movies.splice(deleteMovie);
      res.status(200).json({
        message: "Your new list of movies ",
        data: movies,
      });
    }
  });
});

//read movies
app.get("/movies/read/id/:ID", (req, res) => {
  movies.find((movie) => {
    var id = req.params.ID;
    if (id > movie.length || id == 0 || id == "undifined") {
      res.status(404).json({
        error: true,
        message: `the movie ${req.params.ID} does not exist`,
      });
    } else {
      res
        .status(200)
        .json({ message: "Your movie ", data: movies[req.params.ID - 1] });
    }
  });
});

//read by date
app.get("/movies/read/by-date", (req, res) => {
  const moviesByDate = movies.sort((a, b) => a.year - b.year);
  res.status(200).json({ data: moviesByDate });
});

//read by rating
app.get("/movies/read/by-rating", (req, res) => {
  const moviesByRate = movies.sort((a, b) => a.rating - b.rating);
  res.status(200).json({ data: moviesByRate });
});

//read by title
app.get("/movies/read/by-title", (req, res) => {
  const moviesByTitle = movies.sort((a, b) => {
    let A = a.title.toLowerCase();
    let B = b.title.toLowerCase();
    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
  });
  res.status(200).json({ data: moviesByTitle });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
