const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ message: 'User Does not exist' });
    }

    let expiration = 7200

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      jwt.sign(
        { id: user.id },
        process.env.jwtSecret,
        { expiresIn: expiration },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              expiresIn: expiration
            },
          });
        }
      );
    });
  });
});

//@route GET api/auth/user
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
