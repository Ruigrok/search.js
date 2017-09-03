var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/Article.js");

module.exports = function (app) {

    app.get("/scrape/js", function (req, res) {
        request("https://www.javascript.com/news", function (error, response, html) {

            var $ = cheerio.load(html);
            var promises = [];

            $('.sb-bucket-content').each(function (i, element) {

                var result = {};
                result.title = $(this).find('a').text();
                result.link = $(this).find('div').last('div').find('a').attr('href');
                result.source = "js";

                var query = { "link": result.link }
                var promise = Article.findOneAndUpdate(query, result, { upsert: true }, function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(doc);
                    }
                })
                promises.push(promise);
            })
            Promise.all(promises)
                .then(function () {
                    Article.find({ "source": "js" }, function (error, doc) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.json(doc);
                        }
                    })
                })
        });
    });

    app.get("/scrape/hacker", function (req, res) {
        request("https://hackernoon.com/javascript/home", function (error, response, html) {

            var $ = cheerio.load(html);
            var promises = [];

            $('.u-tableCell').each(function (i, element) {

                var result = {};
                result.title = $(this).find('h3').find('div').text();
                result.link = $(this).find('a').attr('href');
                result.source = "hacker";

                var query = { "link": result.link }
                var promise = Article.findOneAndUpdate(query, result, { upsert: true }, function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(doc);
                    }
                })
                promises.push(promise);
            })
            Promise.all(promises)
                .then(function () {
                    Article.find({ "source": "hacker" }, function (error, doc) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.json(doc);
                        }
                    })
                })
        });
    });

    app.get("/scrape/reddit", function (req, res) {
        request("https://www.reddit.com/r/javascript", function (error, response, html) {

            var $ = cheerio.load(html);
            var promises = [];

            $("p.title").each(function (i, element) {

                var linkVal = $(element).children().attr("href");

                if (linkVal.startsWith("/r/")) {
                    linkVal = "https://www.reddit.com".concat(linkVal);
                }

                var result = {};
                result.title = $(element).text();
                result.link = linkVal;
                result.source = "reddit";

                var query = { "link": result.link }
                var promise = Article.findOneAndUpdate(query, result, { upsert: true }, function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(doc);
                    }
                })
                promises.push(promise);
            })
            Promise.all(promises)
                .then(function () {
                    Article.find({ "source": "reddit" }, function (error, doc) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.json(doc);
                        }
                    })
                })
        })
    });

    app.get("/scrape/echo", function (req, res) {
        request("http://www.echojs.com/", function (error, response, html) {

            var $ = cheerio.load(html);
            var promises = [];

            $("article h2").each(function (i, element) {

                var result = {};
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                result.source = "echo";

                var query = { "link": result.link }
                var promise = Article.findOneAndUpdate(query, result, { upsert: true }, function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(doc);
                    }
                })
                promises.push(promise);
            })
            Promise.all(promises)
                .then(function () {
                    Article.find({ "source": "echo" }, function (error, doc) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.json(doc);
                        }
                    })
                })
        });
    });


};