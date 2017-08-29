var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

module.exports = function (app) {


    // Grab an article by it's ObjectId
    app.get("/article/:id", function (req, res) {
        Article.findOne({ "_id": req.params.id })
            // ..and populate all of the notes associated with it
            .populate("comment")
            .exec(function (error, doc) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.json(doc);
                }
            });
    });

    // Create a new note or replace an existing note
    app.post("/article/:id", function (req, res) {
        var newComment = new Comment(req.body);

        newComment.save(function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
                    .exec(function (err, doc) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.send(doc);
                        }
                    });
            }
        });
    });



}