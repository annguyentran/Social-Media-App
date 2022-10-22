const router = require('express').Router() 
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser
} = require('../../controllers/user');

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').put(updateUser).delete(deleteUser).get(getUser)


module.exports = router;