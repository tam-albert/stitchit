const mongoose = require("mongoose");

//define a journal schema for the database
const JournalSchema = new mongoose.Schema({
  collaborator_ids: [String],
  collaborator_names: [String],
  entries_list: [String],
  name: String,
  cover_photo_url: String,
});

// compile model from schema
module.exports = mongoose.model("journal", JournalSchema);
