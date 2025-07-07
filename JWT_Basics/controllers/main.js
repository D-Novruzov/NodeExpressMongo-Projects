const CustomAPIError = require("../errors/custom-error");
const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  //mongo
  //JOI

  //ckecking in the controller
  if (!username || !password)
    throw new BadRequestError("provide the username and password");
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({
    msg: "user created",
    token,
  });
};
const dashboard = async (req, res) => {
  //validation of the token
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({ msg: `hello ${req.user.username}`, secret: luckyNumber });
};
module.exports = {
  login,
  dashboard,
};
