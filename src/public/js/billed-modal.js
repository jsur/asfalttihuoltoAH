/*http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_bottom*/
var modal = document.getElementById('billed-modal-id');
var btn = document.getElementById("job-billed-id");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
};
span.onclick = function() {
    modal.style.display = "none";
};
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

/*jQuery events*/

$(function() {

	var billedbutton = $(".confirm");

	billedbutton.click(function () {
		var selectedid = $("tbody tr").closest('.selected').attr('id');
		var i = $("tbody tr").closest('.selected').index();

		updateJobStatusBilled(selectedid, i);
	});

	$(".go-back").click(function() {
		modal.style.display = "none";
	});
});

/*AJAX calls*/

function updateJobStatusBilled(selectedid, i) {

		jobUpdateAJAX(
				selectedid, //id
				data[i].started, //started
				data[i].startdate, //startdate
				data[i].completed, //completed
				data[i].actual_completion_date, //actual_completion_date
				true //billed
			);
		$("tbody tr").closest('.selected').css('background-color', '#00B16A').fadeOut('fast');
		window.location.reload();
	}
