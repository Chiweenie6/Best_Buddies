const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// Route is /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Route is /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Route is /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/:thoughtId/reactions").post(createReaction);

// Route is /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;
