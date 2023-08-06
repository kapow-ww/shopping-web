exports.register = async (req, res) => {
  try {
    res.send(req.body.name);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.listUser = async (req, res) => {
  try {
    res.send("List get user");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.editUser = async (req, res) => {
  try {
    res.send("Edit user");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.send("remove user");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
