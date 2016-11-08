$(function() {

	$("#openbtn").click(function() {
		$("#myNav").css({"height": "100%"});
		$("#openbtn").css({"display": "none"});
	});

	$("#closebtn").click(function() {
	    $("#myNav").css({"height": "0%"});
	    $("#openbtn").css({"display": "block"});
	});

});