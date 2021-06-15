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
},
{
  _id: false
})

module.exports = Note = NoteSchema;
