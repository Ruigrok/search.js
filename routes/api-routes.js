var request = require("request");
var cheerio = require("cheerio");
var logger = require("morgan");

var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");
var Echo = require("../models/Article.js");
var Reddit = require("../models/Reddit.js")

module.exports = function (app) {

    app.get("/scrape/echojs", function (req, res) {
        request("http://www.echojs.com/", function (error, response, html) {
            var $ = cheerio.load(html);

            $("article h2").each(function (i, element) {

                var result = {};

                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");

                var entry = new Echo(result);
                Echo.update({ _id: entry._id }, { $addToSet: { title: entry.title } });
                entry.save(function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(doc);
                    }
                })
            })
        });

        Echo.find({}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(doc);
            }
        });
    });

    app.get("/scrape/reddit", function (req, res) {
        request("https://www.reddit.com/r/javascript", function (error, response, html) {

            var $ = cheerio.load(html);
            var results = [];

            $("p.title").each(function (i, element) {

                var result = {};

                result.title = $(element).text();
                result.link = $(element).children().attr("href");

                var entry = new Reddit(result);
                Reddit.update({ _id: entry._id }, { $addToSet: { title: entry.title } });
                entry.save(function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(doc);
                    }
                })
            })
        });

        Reddit.find({}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(doc);
            }
        });

    })

};