var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  // title: a string
  contributor: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String
  }
});

// Make a Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;

