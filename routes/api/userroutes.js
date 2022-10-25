const router = require('express').Router() 
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user');

router.route('/').get(getUsers).post(createUser)

router.route('/:userId').put(updateUser).delete(deleteUser).get(getUser)

router.route('/:userId/:friendId').post(addFriend).delete(deleteFriend)


module.exports = router;