const mongoose = require("mongoose");

//define a entry schema for the database
const PromptSchema = new mongoose.Schema({
  content: String,
  likes: String,
  date: String
});

// compile model from schema
module.exports = mongoose.model("prompt", PromptSchema);
