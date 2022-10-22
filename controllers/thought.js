const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(err))
    },

    getThought(req, res) {
        Thought.findOne({
            _id: req.params.thoughtId
        }).then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(err))
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(err))
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
            .catch((err) => res.status(500).json(err));

    },

    deleteUser(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then(() => res.json({ message: 'Thoughts and reactions deleted!' }))
    .catch((err) => res.status(500).json(err));
    },
};

