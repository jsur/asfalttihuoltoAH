/*http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_bottom*/

// Get the modal
var modal = document.getElementById('billed-modal-id');

// Get the button that opens the modal
var btn = document.getElementById("job-billed-id");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/*jQuery events*/

$(function() {

	var billedbutton = $(".confirm");

	billedbutton.click(function () {
		var selectedid = $("tbody tr").closest('.selected').attr('id');
		var i = $("tbody tr").closest('.selected').index();
		console.log(selectedid, i);

		updateJobStatusBilled(selectedid, i)
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
				data[i].completiondate, //completiondate
				true //billed
			);
		window.location.reload();
	};
