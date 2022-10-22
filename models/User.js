const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
   
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }

    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
        
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.virtuals('FriendCount').get(function(){
    return this.friends.length
})
const User = model('User', userSchema);

module.exports = User;
