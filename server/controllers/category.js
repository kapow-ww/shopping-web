exports.list = async (req, res) => {
  res.send("get hello from category");
};

exports.create = async (req, res) => {
  res.send("create category");
};

exports.read = async (req, res) => {
  res.send("Read category by id");
};

exports.update = async (req, res) => {
  res.send("Edit category by id");
};

exports.remove = async (req, res) => {
  res.send("Delete category by id");
};
