$(document).ready(function() {

    // console.log data array
    // function runFriendsQuery() {
    //     var currentURL = window.location.origin;
    //     console.log(currentURL);
    //     $.ajax({ url: currentURL + "/api/friends-data", method: "GET" }).done(function(arrayData) {
    //     });
    // }
    // runFriendsQuery();

    // When the user clicks on <span> (x), close the modal
    var span = $(".close");
    span.onclick = function() {
        $("resultsModal").style.display = "none";
    }

    // retrieve form information
    $("#submit").on("click", function(event) {
        event.preventDefault();

        var userData = {
            name: $("#name").val().trim(),
            urlPhoto: $("#urlPhoto").val().trim(),
            choices: [
                $("#q1").val(),
                $("#q2").val(),
                $("#q3").val(),
                $("#q4").val(),
                $("#q5").val(),
                $("#q6").val(),
                $("#q7").val(),
                $("#q8").val(),
                $("#q9").val(),
                $("#q10").val()
            ]
        }
        console.log(userData);

        var currentURL = window.location.origin;

        // post info from user into database
        $.post(currentURL + "/api/survey", userData, function(data) {

            // result from the AJAX post displays the matched friend name and photo
            $("#matchName").text(data.name);
            $('#matchImg').attr("src", data.photoLink);

            // show image of new friend in a modal
            document.getElementById('resultsModal').style.display = "block";

            // Get the <span> element that closes the modal, and clear form when modal is closed
            $(".close").on('click', function() {
                    document.getElementById('resultsModal').style.display = "none";
                    document.getElementById('survey').reset();
            });
                // var span = document.getElementsByClassName("close")[0];
                // Clear form when submitting

            console.log(data);
            // console.log(data);
        });

    });


});
