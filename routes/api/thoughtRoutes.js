const router = require('express').Router() 
const {
    getThoughts,
    getThought,
    updateThought,
    deleteThought,
    createThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought');

router.route('')

// Getting all the thoughts
router.route('/').get(getThoughts);

// Getting a single thought, deleting a thought, updating a thought
router.route('/:thoughtId').delete(deleteThought).get(getThought).put(updateThought);

// Creating a single thought 
router.route('/:userId').post(createThought)

// Add a reaction from a thought 
router.route('/:thoughtId/reactions').post(addReaction)

// Delete a reaction from a thought 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)


module.exports = router;