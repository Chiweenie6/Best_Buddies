const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  removeFriendFromUser,
} = require("../../controllers/userController.js");

// Route is /api/users
router.route("/").get(getAllUsers).post(createUser);

// Route is /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Route is /api/users?:userId/friends
router.route("/:userId/friends/friendId").post(addFriendToUser);

// Route is /api/users/:userId/friends/:friendId
router.route("/:userId/friends/friendId").delete(removeFriendFromUser);

module.exports = router;
