const { Thoughts, User } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
      Thoughts.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    // Get a thoughts
    getSingleThought(req, res) {
      Thoughts.findOne({ _id: req.params.thoughtsId })
        .select('-__v')
        .then((thoughts) =>
          !thoughts
            ? res.status(404).json({ message: 'No thoughts with that ID' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Create a thoughts
    createThoughts(req, res) {
      Thoughts.create(req.body)
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

      // Delete a thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : User.deleteMany({ _id: { $in: thoughts.users } })
      )
      .then(() => res.json({ message: 'Thoughts and Users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a thoughts
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add reaction
  addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: req.body.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: 'No thoughts found with that ID :(' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // delete reaction
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: 'No thoughts found with that ID :(' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};
