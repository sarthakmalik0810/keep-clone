const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'todo',
      },
    ],
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'label',
      },
    ],
    isDarkMode: {
      type: Boolean,
      default: false
    },
    isListMode: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: 'registerDate',
    },
  }
);

module.exports = User = mongoose.model('user', UserSchema);
