var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

module.exports = function (app) {


    // Grab an article by it's ObjectId
    app.get("/article/:id", function (req, res) {
        Article.find({ "_id": req.params.id })
            .populate("notes")
            .exec(function (error, doc) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(doc);
                    //console.log(doc[0])
                    res.json(doc);
                }
            });
    });

    // Create a new note or replace an existing note
    app.post("/article/:id", function (req, res) {
        var newNote = new Note(req.body);

        newNote.save(function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                Article.findByIdAndUpdate({ "_id": req.params.id },
                    { $push: { "notes": doc._id } }, { new: true }, function (error, doc) {
                        console.log(doc);
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.send(doc);
                        }
                    });
            }
        });
    });

    app.post("/delete/:id", function (req, res) {
        Note.remove({ "_id": req.params.id }, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.send(doc);
            }
        })
    })

}

