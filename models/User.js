var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },

  articles: [{
    type: Schema.Types.ObjectId,
    ref: "articles"
  }]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
