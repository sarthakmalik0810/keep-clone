const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ message: 'User Does not exist' });
    }

    let expiration = 7200;

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials' });
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
              expiresIn: expiration,
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
    .select('-password -todos -_id -labels')
    .then(user => res.json(user));
});

router.patch('/user', auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const { isDarkMode, isListMode, name, email, registerDate, updatedAt } =
      await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        useFindAndModify: false,
      });
    res
      .status(202)
      .json({
        success: true,
        data: { isDarkMode, isListMode, name, email, registerDate, updatedAt },
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
