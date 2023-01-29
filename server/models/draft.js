const mongoose = require("mongoose");

//define a entry schema for the database
const DraftSchema = new mongoose.Schema({
  creator_id: String,
  content: String,
  time_created: {
    type: Date,
    default: Date.now,
  },
});

// compile model from schema
module.exports = mongoose.model("draft", DraftSchema);
