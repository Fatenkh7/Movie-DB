const express = require("express");
const router = express.Router();
const User = require("../models/User");

//get users
router.get("/", async (req, res) => {
  let password = req.body.password;
  if (password) {
    encryptedPassword = await bcrypt.hash(password, 15);
    update.password = encryptedPassword;
  }
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//create a user
router.post("/", async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
  });
  try {
    let password = req.body.password;
    if (password) {
      encryptedPassword = await bcrypt.hash(password, 15);
      update.password = encryptedPassword;
    }
    const savedUser = await user.save();
    res.status(200).json({ data: savedUser });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//update a user
router.patch("/:USERNAME", async (req, res) => {
  try {
    let filter = { username: req.params.USERNAME };
    let update = req.body;
    let password = req.body.password;
    if (password) {
      encryptedPassword = await bcrypt.hash(password, 15);
      update.password = encryptedPassword;
    }
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
