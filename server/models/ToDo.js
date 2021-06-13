const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  title: String,
  color: {
    type: String,
    required: true
  },
  isCheckboxMode: {
    type: Boolean,
    default: false,
    required: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'note'
  }],
  labels: [{
    type: Schema.Types.ObjectId,
    ref: 'label'
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

module.exports = ToDo = mongoose.model('todo', ToDoSchema);


