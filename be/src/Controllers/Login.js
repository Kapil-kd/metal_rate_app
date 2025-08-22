const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(200).json({ msg: "Bad request", code: 401 });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({
        token,
        user: { name: user.name, email: user.email },
        msg: "Login success",
        code: 200,
      });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
