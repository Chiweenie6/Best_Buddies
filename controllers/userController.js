const { User, Thought } = require("../models");

module.exports = {
  // GET all Users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(505).json(err));
  },
  // GET single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // .select ("-__v") = Does not show versionKey
      .select("-__v")
      .then((user) =>
        !user
          ? // If User id not found
            res.status(404).json({ message: "🚫 No User Id Found 🚫" })
          : // or if id found
            res.json(user)
      )
      .catch((err) => res.status(505).json(err));
  },
  //   POST/create new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        return res.status(505).json(err);
      });
  },
  // PUT/update existing User
  updateUser(req, res) {
    User.findOneAndUpdate(
      // find the user id
      { _id: req.params.userId },
      //   update the User data
      { $set: req.body },
      // need "new: true" to post the new User data after update. Turns on update validators
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "🚫 No User Id Found 🚫" })
          : res.json(user)
      )
      .catch((err) => res.status(505).json(err));
  },
  // DELETE a User along with their Thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "🚫 No User Id Found 🚫" })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        // Code Above: find any thoughts created by the User, so they are delted along with User
      )
      .then(() =>
        res.json({ message: "👤 User and their Thoughts Deleted 🔥" })
      )
      .catch((err) => res.status(505).json(err));
  },
  // POST/Add new friend to User's friend list
  addFriendToUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "🚫 Couldn't Add Friend 🚫" })
          : res.json(user)
      )
      .catch((err) => res.status(505).json(err));
  },
  // DELETE/remove friend from User's friend list
  removeFriendFromUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !student
          ? res.status(404).json({ message: "🚫 Couldn't Remove Friend 🚫" })
          : res.json(user)
      )
      .catch((err) => res.status(505).json(err));
  },
};
