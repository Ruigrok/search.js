var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

module.exports = function (app) {

    // Save an article
    app.post("/save/:articleId", function (req, res) {

        Article.findByIdAndUpdate(req.params.articleId, { $set: {"saved": true }}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(doc);
            }
        })
    });

    // Get saved articles from a specific source
    app.get("/saved/:source", function (req, res) {

        Article.find({ "saved": true, "source": req.params.source }, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(doc);
            }
        })
    })

    app.post("/remove/:articleId", function (req, res) {

        Article.findByIdAndUpdate(req.params.articleId, { $set: {"saved": false }}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(doc);
            }
        })
    });


}



