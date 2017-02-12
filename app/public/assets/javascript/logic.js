$(document).ready(function() {
    var userData = {};
    var missOption;
    var emptyInput;

    // retrieve form information
    $("#submit").on("click", function(event) {
        event.preventDefault();

        userData = {
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

        // resetting missOptions array with each submit
        missOption = [];
        emptyInput = false;

        runValidate();
    }); // end on-click submit

    function runValidate() {

        if (userData.name == "" || userData.urlPhoto == "") {
            emptyInput = true;
            $("#emptyInput").text("Name / Photo Link are required");
        } else { $("#emptyInput").text("Please enter missing information"); }

        for (i in userData.choices) {
            if (userData.choices[i] == "") {
                missOption.push(" " + (1 + parseInt(i)));
            }
        }   // end for loop

        var emptyOption = "You did not select option on questions: " + missOption;
        if (missOption.length !== 0) { $("#emptyOption").text(emptyOption); }
            else { $("#emptyOption").text("Please provide information"); }

        // show error message if missing info from form
        if (emptyInput || missOption.length !== 0) {
            document.getElementById('errorModal').style.display = "block";
            // close error modal
            $(".closeError").on('click', function() {
                document.getElementById('errorModal').style.display = "none";
            });
        } else {
            // all is good, find friend
            runPostData();
        }
    } // end validate


    function runPostData() {
        var currentURL = window.location.origin;

        // post info from user into database
        $.post(currentURL + "/api/survey", userData, function(data) {

            // result from the AJAX post displays the matched friend name and photo
            $("#matchName").text(data.name);
            $('#matchImg').attr("src", data.photoLink);

            // show image of new friend in a modal
            document.getElementById('resultsModal').style.display = "block";

            // return to top of current page where image of new friend is displayed
            $("html, body").animate({
                scrollTop: 0
            }, 200);

            // close modal, also reset form when modal is closed
            $(".close").on('click', function() {
                document.getElementById('resultsModal').style.display = "none";
                document.getElementById('survey').reset();
            });
        });
    }   // end runPostData

});   // end document.ready