
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var nodemon = require("nodemon");
var mongoose = require("mongoose");
var logger = require("morgan");
var exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Make public a static dir
app.use(express.static("public"));

// Set up Mongoose
mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://heroku_0gh8x77k:od02dkqvubeoavd0m0sdjuqt9j@ds121674.mlab.com:21674/heroku_0gh8x77k');

db
    .then(function (db) {
        console.log('mongodb has been connected');
    })
    .catch(function (err) {
        console.log('error while trying to connect with mongodb');
    });


// Routes
require("./routes/html-routes.js")(app); 
require("./routes/api-search-routes.js")(app);
require("./routes/api-save-routes.js")(app); 
require("./routes/api-comment-routes")(app);



// ================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


