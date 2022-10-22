const { Schema } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


module.exports = reactionSchema;