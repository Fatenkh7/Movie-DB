const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./database").connect();
const port = 3000;
app.use(bodyParser.json());

// import MOVIES Routes
const moviesRoutes = require("./routes/movies.js");
// import USERS Routes
const usersRoutes = require("./routes/users.js");

//Route movies Middlewares
app.use("/movies", moviesRoutes);
//Route users Middlewares
app.use("/users", usersRoutes);

//testing..
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
