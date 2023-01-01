const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token_Secret = "Batata is love";
const { registerValidation, loginValidation } = require("./validationUsers");

//get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//create a user
router.post("/register", async (req, res) => {
  //validate the data
  const result = registerValidation(req.body);
  if (result.error) {
    return res.send(`Error: ${result.error.details[0].message}`);
  }
  //checking if the userName and the password already in the DB
  const userNameExist = await User.findOne({ userName: req.body.userName });
  const passwordExist = await User.findOne({ password: req.body.password });
  if (userNameExist)
    return res
      .status(400)
      .send("The userName is already exists please change it");
  else if (passwordExist)
    return res.status(400).send("The password already used please change it");

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    userName: req.body.userName,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(200).json({ data: savedUser });
  } catch (error) {
    res.status(400).send(error);
  }
});

//login..
router.post("/login", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    userName: req.body.userName,
    password: hashedPassword,
  });
  //validate the data
  const result = loginValidation(req.body);
  if (result.error) {
    return res.send(`Error: ${result.error.details[0].message}`);
  }
  //checking if the user exists in the DB
  const userExist = await User.findOne({ userName: req.body.userName });
  if (!userExist)
    return res.status(400).send("The userName or the password is wrong");

  //check if the password is correct
  let validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //create and assign a token
  const token = jwt.sign({ _id: user.id }, Token_Secret);
  res.header("auth-token", token).send(token);

  res.send("Logged in!!");
});

//update a user
router.patch("/:USERNAME", async (req, res) => {
  try {
    let filter = { username: req.params.USERNAME };
    let update = req.body;
    const updateUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json({ data: updateUser });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//delete user by userName
router.delete("/:USERNAME", async (req, res) => {
  try {
    const removeUser = await User.remove({ userName: req.params.USERNAME });
    res.status(200).json({ data: removeUser });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
