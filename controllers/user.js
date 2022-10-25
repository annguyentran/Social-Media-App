const { User, Thought } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then(userData => res.json(userData))
            .catch(err => res.status(err))
    },

    getUser(req, res) {
        User.findOne({
            _id: req.params.userId
        }).then(userData => res.json(userData))
            .catch(err => res.status(err))
    },
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(err))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
        )
            .catch((err) => res.status(500).json(err));

    },

    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with that ID' })
      : Thought.deleteMany({ _id: { $in: user.thoughts } })
    )
    .then(() => res.json({ message: 'Users and thoughts deleted!' }))
    .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
            ) .then(user => {
                if(!user){
                    res.status(404).json({message: 'No user found with this ID'})
                } res.json(user)
            })
            .catch((err) => res.status(500).json(err))
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((friend) =>
            !friend
              ? res
                  .status(404)
                  .json({ message: 'No friend to remove with that existing ID.' })
              : res.json(friend)
          )
          .catch((err) => res.status(500).json(err));
      },
};


