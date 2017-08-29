var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true,
    unique: true
  },

  source: {
    type: String,
    required: true
  },

  saved: {type: Boolean, default: 0},
  
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
