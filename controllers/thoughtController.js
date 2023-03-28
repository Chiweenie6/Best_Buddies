const { User, Thought } = require("../models");

module.exports = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(505).json(err));
  },
  // GET individual Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "🚫 Thought Id Not Found 🚫" })
          : res.json(thought)
      )
      .catch((err) => res.status(505).json(err));
  },
  // POST/create new Thought. Since Thought is associated with User, User has to be updated at same time in order for the new Thought to be added to the User's Thoughts array
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "🚫 Thought created, No User Id Found 🚫" })
          : res.json(user)
      )
      .catch((err) => {
        res.status(505).json(err);
      });
  },
  // PUT/update Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "🚫 Couldn't Find Thought Id 🚫" })
          : res.json(thought)
      )
      .catch((err) => {
        res.status(505).json(err);
      });
  },
  // DELETE Thought. Since Thought is associated with User, the User's Thought array must be updated at same time
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "🚫 Couldn't Find Thought Id 🚫" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "🚫 Couldn't Find User Id 🚫" })
          : res.json(user)
      )
      .catch((err) => res.status(505).json(err));
  },
  // POST/create reaction and store it in a single thoughts array
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "🚫 Couldn't Find Thought Id 🚫" })
          : res.json(thought)
      )
      .catch((err) => res.status(505).json(err));
  },
  // DELETE/remove a reaction from a Thought and updates the reaction array on the Thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "🚫 Couldn't find Thought Id 🚫" })
          : res.json(thought)
      )
      .catch((err) => res.status(505).json(err));
  },
};
