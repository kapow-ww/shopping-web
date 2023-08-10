const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOne({ username });

    console.log(user);
    if (user) {
      return res.status(400).send("ชื่อผู้ใช้งานนี้ถูกใช้งานแล้ว");
    }

    const salt = await bcrypt.genSalt(10);
    user = new User({ username, password });

    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.send("สมัครสมาชิกเสร็จสิ้น");
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
        return res.status(400).send("รหัสผ่านไม่ถูกต้อง");
      }

      const payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };

      jwt.sign(payload, "jwtSecret", { expiresIn: "365d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("ไม่พบผู้ใช้งานนี้");
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

exports.editUser = async (req, res) => {
  try {
    res.send("อัพเดตผู้ใช้งานเรียบร้อย");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.send("ลบผู้ใช้งานเรียบร้อย");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
