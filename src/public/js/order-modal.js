/*http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_bottom*/

// Get the modal
var modal = document.getElementById('order-modal-id');

// Get the button that opens the modal
var btn = document.getElementById("order-button-id");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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

	var orderbutton = $(".confirm");

	orderbutton.click(function () {
		modal.style.display = "none";
		$("html, body").animate({ scrollTop: 0 }, "fast");
		$(".postsuccess").css("display", "block");
		//POST request here, display postsuccess on successful POST
	});

	$(".go-back").click(function() {
		modal.style.display = "none";
	});
	
});