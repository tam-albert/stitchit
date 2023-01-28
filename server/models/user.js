const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  bio: String,
  pfp: {
    type: String,
    default: "https://i.imgur.com/U3MN5eW.png",
  },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
