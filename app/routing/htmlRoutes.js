// direct user to specific page

// DEPENDENCIES
var path = require("path");

module.exports = function(app) {

    // path to survey page
    app.get("/survey", function(request, response) {
        response.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // return home if any other route
    app.use(function(request, response) {
        response.sendFile(path.join(__dirname, "../public/home.html"));
    });
}
