// linking routes to data source
var friends = require("../data/friends-data.js");

// ROUTING
module.exports = function(app) {
    // API GET Requests
    app.get("/api/friends-data", function(request, response) {
        // prepare output in json format
        response.json(friends);
    });

    // API POST Requests: user completed survey data is sent to database
    // path to where the post is being requested/submitted, that is where the form submit button is
    // path has to match on form page
    app.post("/api/survey", function(request, response) {

        // choices array from user/client
        console.log(request.body.choices);

        // converting user/client choices-array to string with join and separator '+'
        // finding sum of array elements by evaluating the string with eval
        var userTotal = eval(request.body.choices.join('+'));
        console.log("user total: " + userTotal);

        // store friend match in variable match
        // affinity is the potential friend candidate set to max choices-sum of 50
        var match = 0;
        var affinity = 50;

        // evaluate choices-sum for each candidate in database, stored in seekFriend
        for (let i = 0; i < friends.length; i++) {
            var seekFriend = eval(friends[i].choices.join('+'));
            console.log("potential friend: " + seekFriend);
            console.log("difference: " + Math.abs(userTotal - seekFriend));
            console.log(Math.abs(userTotal - seekFriend) <= affinity)
            // evaluate choices-sum difference between user/client and database candidates
            // the lower the difference, the higher the affinity
            if (Math.abs(userTotal - seekFriend) <= affinity) {
                console.log("new affinity: " + affinity)
                affinity = Math.abs(userTotal - seekFriend);
                match = i;
            }
        }

        console.log(friends[match].name);
        console.log(friends[match].photoLink);

        // push new data in array
        friends.push(request.body);

        // return match
        response.json(friends[match]);
    });

}
