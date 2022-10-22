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
            { _id: req.params.userId }
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
};

