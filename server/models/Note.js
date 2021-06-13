const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const NoteSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: true,
    required: true
  }
})

module.exports = Note = mongoose.model('note', NoteSchema);
