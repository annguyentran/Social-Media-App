const router = require('express').Router() 
const {
    getThoughts,
    getThought,
    updateThought,
    deleteThought,
    createThought
} = require('../../controllers/thought');

router.route('')

router.route('/').get(getThoughts);
router.route('/:thoughtId').delete(deleteThought).get(getThought);
router.route('/:userId').put(createThought)

module.exports = router;