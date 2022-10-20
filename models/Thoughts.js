// const { Timestamp } = require('bson');
const { Schema, model } = require('mongoose');
// const { stringify } = require('querystring');
const reactionSchema = require('./Reaction')

// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Think and write of a thought!",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // get: timeStamp,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
    // reaction: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reaction.length;
});

const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;