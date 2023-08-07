const User = require("../models/User");

exports.listUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .select("-password")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// ! unfinish
exports.updateUsers = async (req, res) => {
  try {
    res.send("update users");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.removeUsers = async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });
    res.send(`${user.username} has removed`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(`${user.username} has updated`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
