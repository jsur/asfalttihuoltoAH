/*http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_bottom*/
var url = window.location.href
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
		postOrder();
	});

	$(".go-back").click(function() {
		modal.style.display = "none";
	});
});

/*AJAX calls*/

postOrder = 

	function postOrder(url) { $.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			id: '',
			clientname: $("#clientname").val(),
			address: $("#address").val(),
			orderdate: $("#orderdate").val(),
			sitesize: $("#sitesize").val(),
			stonework: $("#stoneworkcheckid").is(':checked'),
			stoneworkdescription: $("#stoneworkdescription").val(),
			streetcategory: $("#streetcategories").val(),
			completiongoal: $("#completiongoal").val(),
			completiondate: $("#completiondate").val()
		},
		success: function(data, status) {
			modal.style.display = "none";
			$("html, body").animate({ scrollTop: 0 }, "fast");
			$(".postsuccess").css("display", "block");
			console.log("Order complete.")
			},
		error: function(data, status) {
			$("#post-order-button").after("<span class='errormsg'> Virhe tallennuksessa! Ota yhteys ylläpitoon.</span>")
			console.log(data);
			}
		})
	}