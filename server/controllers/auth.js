const User = require("../models/User");

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }
  const compare = await user.comparePassword(password);
  if (!compare) {
    return res.status(401).json({ message: "Incorrect password!" });
  }
  try {
    const token = user.createToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

const Register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = await User.create({ email, password });
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { Register, Login, getUsers };
