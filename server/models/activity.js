// Used for entries in a feed
const mongoose = require("mongoose");

//define a entry schema for the database
const ActivitySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  link: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  visible_to: [String],
});

// compile model from schema
module.exports = mongoose.model("activity", ActivitySchema);
