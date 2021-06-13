const express = require('express');
const router = express.Router();

const ToDo = require('../../models/ToDo');
const User = require('../../models/User');
const Note = require('../../models/Note');
const Label = require('../../models/Label');
const auth = require('../../middleware/auth');

router.post('/addTodo', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, color, isCheckboxMode, notes, labels } = req.body;

    const todo = new ToDo({ title, color, isCheckboxMode, userId });
    await todo.save();
    const todoId = todo.id;

    const user = await User.findById({ _id: userId });
    user.todos.push(todo);
    await user.save();

    if (notes?.length > 0) {
      notes.forEach(async (noteObj) => {
        const newNote = new Note({
          todoId,
          ...noteObj,
        });
        await newNote.save();
        todo.notes.push(newNote);
        await todo.save();
      });
    }
    if (labels?.length > 0) {
      labels.forEach(async (labelObj) => {
        await Label.findOneAndUpdate(
          { _id: labelObj.id },
          { $push: { todos: todo } }
        );
      });
    }

    res.status(200).json({success: true, data: todo});
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
