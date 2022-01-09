const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//! create token :
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
//! handle errors :
const handleErrors = (err) => {
  let errors = { email: "", first_name: "", last_name: "", password: "" };

  // validation errors
  if (err.message.includes("UserSchema validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }
  return errors;
};

//? sign up :

module.exports.signup = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  try {
    const user = await User.create({
      email,
      first_name,
      last_name,
      password,
      isAdmin: false,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

//? login :
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({user});
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports.logout = (req, res) => {
  return res.status(202).clearCookie("jwt").send("cookie cleared");
};

module.exports.admin = (req, res) => {
  res.json({ isAdmin: req.isAdmin });
  res.status(200);
};
