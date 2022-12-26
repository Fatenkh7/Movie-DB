const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("ok");
});
app.get("/test", (req, res) => {
  res.status(200).json({ message: "ok" });
});
app.get("/time", (req, res) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  res.status(200).json({ message: `${hours}: ${minutes}` });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
