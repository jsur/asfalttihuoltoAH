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

	var billedbutton = $(".mark-as-billed");

	billedbutton.click(function () {
		billedbutton.after("<span>Ja nyt päivittyy tiedot tietokantaan.</span>")
	});

	$(".go-back").click(function() {
		modal.style.display = "none";	
	});
	
});