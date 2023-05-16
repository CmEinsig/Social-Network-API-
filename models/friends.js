const { Schema, model } = require('mongoose');
const emailSchema = require('./email');

// Schema to create friend model
const friendSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },

    email: [emailSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const friend = model('friend', friendSchema);

module.exports = friend;