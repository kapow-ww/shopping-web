const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    console.log(count);
    const product = await Product.find()
      .limit(count)
      .sort([["createdAt", "desc"]])
      .populate("category");
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const count = parseInt(req.params.count);
    console.log(count);
    const product = await Product.find()
      .limit(limit)
      .sort([[sort, order]])
      .populate("category");
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      _id: req.params.id,
    }).exec();
    res.send(deleted);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};
