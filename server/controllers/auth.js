const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOne({ username });

    console.log(user);
    if (user) {
      return res.status(400).send("User Already exists");
    }

    const salt = await bcrypt.genSalt(10);
    user = new User({ username, password });

    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.send("Register success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOneAndUpdate({ username }, { new: true });
    if (user && user.enabled) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid");
      }

      const payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };

      jwt.sign(payload, "jwtSecret", { expiresIn: "30m" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User Not Found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.user.username,
    })
      .select("-password")
      .exec();

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.listUser = async (req, res) => {
  try {
    res.send("List get user");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.editUser = async (req, res) => {
  try {
    res.send("Edit user");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.send("remove user");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
