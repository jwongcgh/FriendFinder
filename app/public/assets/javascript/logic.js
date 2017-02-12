$(document).ready(function() {

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

        var currentURL = window.location.origin;

        // post info from user into database
        $.post(currentURL + "/api/survey", userData, function(data) {

            // result from the AJAX post displays the matched friend name and photo
            $("#matchName").text(data.name);
            $('#matchImg').attr("src", data.photoLink);

            // show image of new friend in a modal
            document.getElementById('resultsModal').style.display = "block";

            // return to top of current page
            $("html, body").animate({
                scrollTop: 0
            }, 200);

            // Get the <span> element that closes the modal, and clear form when modal is closed
            $(".close").on('click', function() {
                    document.getElementById('resultsModal').style.display = "none";
                    document.getElementById('survey').reset();
            });
        });
    });
});
