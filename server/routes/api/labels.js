const express = require('express');
const router = express.Router();

const ToDo = require('../../models/ToDo');
const User = require('../../models/User');
const Label = require('../../models/Label');
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const labels = await Label.find({
      userId: {
        $in: userId,
      },
    });

    res.status(200).json({ success: true, data: labels });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const user = req.user;
    const name = req.body.name;
    const label = new Label({ name: name, userId: user.id });
    await label.save();

    const currentUser = await User.findById({ _id: user.id });
    currentUser.labels.push(label);
    await currentUser.save();

    res.status(200).json({ success: true, data: label });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const user = req.user;
    const label = await Label.findByIdAndDelete(req.body.labelId);

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          labels: req.body.labelId,
        },
      },
      { useFindAndModify: false }
    );

    const todos = label.todos;
    if (todos.length > 0) {
      todos.forEach(async todo => {
        await ToDo.findByIdAndUpdate(
          todo,
          {
            $pull: {
              labels: req.body.labelId,
            },
          },
          { useFindAndModify: false }
        );
      });
    }
    res.status(200).json({ success: true, data: label });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
