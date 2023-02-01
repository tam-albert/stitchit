const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  bio: String,
  pfp: {
    type: String,
    default: "https://i.imgur.com/XUgdKnB.jpg",
  },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
