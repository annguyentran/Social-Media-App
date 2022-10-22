const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction.js')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        userName: {
            type: String,
            required: true,
            trim: true,

        },

        reactions: [reactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
