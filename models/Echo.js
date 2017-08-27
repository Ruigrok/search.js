var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EchoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },

});

var Echo = mongoose.model("Echo", EchoSchema);

module.exports = Reddit;
