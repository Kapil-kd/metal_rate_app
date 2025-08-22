const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const demoUser = { id: 'demo', username: 'admin', passwordHash: bcrypt.hashSync('password', 8) };

exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  
  if (username !== demoUser.username) return res.status(400).json({ msg: 'Invalid credentials' });
  const isMatch = bcrypt.compareSync(password, demoUser.passwordHash);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const payload = { user: { id: demoUser.id, username: demoUser.username } };
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
};
