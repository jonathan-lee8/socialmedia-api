const { Schema, model } = require('mongoose');
// const { stringify } = require('querystring');

// Schema to create Student Model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts"
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;