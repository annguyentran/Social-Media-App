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
            .then(thoughtData => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                )
            }).then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'Thought created but user not found' })
                } res.json({ message: 'Thought added to user' })
            })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(404).json({ message: "failed to create thought" }))
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
            .catch((err) => res.status(500).json(err));

    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'No thought with this id!' })

                }
                return User.findOneAndUpdate(

                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }

                )
            })
            .then(() => res.json({ message: 'Thoughts and reactions deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // Adding a reaction to a thought 

addReaction(req, res){
    console.log('You are adding a reaction')
    console.log(req.body)
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        {runValidators: true, new: true}
    )
    .then(thought => {
        if(!thought){
            res.status(404).json({message: 'No thought found with that ID'})
        } res.json(thought)
    })
    .catch((err) => res.status(500).json(err))
},

// Delete a reaction from a thought 
deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

