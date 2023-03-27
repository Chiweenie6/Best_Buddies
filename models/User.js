const { Schema, model } = require("mongoose");

// Schema to create a User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // Regex for an email validation
      match:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // docModel: {
    //   type: String,
    //   enum: ["User", "Thought"],
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    strict: true,
  }
);

// Virtual property named "friendCount" created to show number of friends the User has
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
