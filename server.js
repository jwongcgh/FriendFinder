// DEPENDENCIES
// required npm packages

var bodyParser =  require('body-parser');
var express = require('express');
var path = require('path');


// EXPRESS CONFIGURATION

// create express server
var app = express();

// handling static files
app.use(express.static(path.join(__dirname, "/app/public")));

// process.env.PORT take port on deployment site such as heroku
var PORT = process.env.PORT || 3000;

// body parser for body pre-processing so server can interpret data sent to it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json;"}));

// ROUTER
// points to a series of route files
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// LISTENER
// starting server
app.listen(PORT, function() {
  console.log("App listening on PORT: ", PORT);
});
