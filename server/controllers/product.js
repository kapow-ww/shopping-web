const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.list = async (req, res) => {
  try {
    const product = await Product.find().populate("category");
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};
