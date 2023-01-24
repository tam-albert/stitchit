const mongoose = require("mongoose");

//define a entry schema for the database
const EntrySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  prompt_id: String,
  content: String,
  journal_id: String,
});

// compile model from schema
module.exports = mongoose.model("entry", EntrySchema);
