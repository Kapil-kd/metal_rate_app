const User = require("../models/User");
const { Verify } = require("../utils/Verify");

exports.Logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = Verify(token);

    if (verify.userId) {
      return res.status(200).json({ msg: "Logout success", code: 200 });
    }
    return res.status(200).json({ msg: "Something went wrong", code: 400 });
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", code: 500 });
  }
};
