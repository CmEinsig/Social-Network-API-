const { Schema, Types } = require('mongoose');

const emailSchema = new Schema(
  {
    emailId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    emailName: {
      type: String,
      required: true,
      unique: true 
//TO DO: insert match validation 
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = emailSchema;