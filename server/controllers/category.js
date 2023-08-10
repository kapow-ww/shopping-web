const Category = require("../models/Category");

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).exec();
    res.send(category);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await new Category({ name }).save();
    res.send(`สร้างหมวดหมู่ ${category.name} เรียบร้อย`);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).exec();

    res.send(category);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { name: name }
    ).exec();

    res.send("อัพเดตหมวดหมู่เรียบร้อย");
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};

exports.remove = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
    }).exec();

    res.send(`Delete ${category.name} category`);
  } catch (err) {
    res.status(500).send("Server Error!");
  }
};
