const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const LabelSchema = new Schema({
  name: {
    type: String,
    required: "Please enter a name",
    trim: true
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'todo',
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = Label = mongoose.model('label', LabelSchema);
