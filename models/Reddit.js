var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RedditSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },

});

var Reddit = mongoose.model("Reddit", RedditSchema);

module.exports = Reddit;
