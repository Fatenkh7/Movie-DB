const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("ACCESS DENIED");
  try {
    const verified = jwt.verify(token, Token_Secret);
    req.user = verified;
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
};
