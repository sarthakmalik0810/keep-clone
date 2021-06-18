const express = require('express');
const router = express.Router();

const ToDo = require('../../models/ToDo');
const User = require('../../models/User');
const Label = require('../../models/Label');
const auth = require('../../middleware/auth');

router.get('/get-todos', auth, async (req, res) => {
  const userId = req.user.id;

  const todos = await ToDo.find({
    userId: {
      $in: userId,
    },
  }).
  populate({
    path: 'labels', select: '_id name'
  });

  res.status(200).json({ success: true, data: todos });
});

router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, color, isCheckboxMode, notes, labels } = req.body;

    const todo = new ToDo({
      title,
      color,
      isCheckboxMode,
      userId,
      notes,
      labels,
    });
    await todo.save();

    const user = await User.findById({ _id: userId });
    user.todos.push(todo);
    await user.save();

    if (labels?.length > 0) {
      labels.forEach(async labelObj => {
        await Label.findOneAndUpdate(
          { _id: labelObj },
          { $push: { todos: todo } }
        );
      });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndDelete(req.body.todoId);

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          todos: req.body.todoId,
        },
      },
      { useFindAndModify: true }
    );

    if (todo.labels?.length > 0) {
      todo.labels.forEach(async label => {
        await Label.findByIdAndUpdate(
          label,
          {
            $pull: {
              todos: req.body.todoId,
            },
          },
          { useFindAndModify: true }
        );
      });
    }

    res.status(202).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.patch('/', auth, async (req, res) => {
  try {
    const { _id: todoId } = req.body;
    const todo = req.body;
    const updatedToDo = await ToDo.findByIdAndUpdate(todoId, todo, {
      new: true,
      useFindAndModify: false,
    });

    if (updatedToDo) {
      res.status(200).json({ success: true, data: updatedToDo });
    } else {
      res.status(404).json({ success: false, message: 'Not Found' });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
