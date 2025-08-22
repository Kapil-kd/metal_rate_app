const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    if(!name || !email || !password){
        return res.status(200).json({msg:"Bad request",code:401})
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if(user){
       return res.status(200).json({msg:"User created",code:200})
    }
       return res.status(200).json({msg:"Something went wrong",code:400})


  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
}