const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  deleteThoughts,
  updateThoughts,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

// api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// api/thoughts/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

  // api/thoughts/:thoughtsId/reaction
  router.route('/:thoughtsId/reactions').post(addReaction);

  // api/thoughts/:thoughtsId/reaction/reactionId
  router.route('/:thoughtsId/reactions/reactionId').delete(deleteReaction);

  module.exports = router;