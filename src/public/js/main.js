$("#openbtn").click(function() {
	$("#myNav").css({"height": "100%"});
	$("#openbtn").css({"display": "none"});
});

$("#closebtn").click(function() {
    $("#myNav").css({"height": "0%"});
    $("#openbtn").css({"display": "block"});
});

$(".job-additional-info").click(function() {

var selectedid = $("tbody tr").closest('.selected').attr('id');
getJobAdditionalInfoById(selectedid);

});

$("#jobInfo-closebtn").click(function() {

	$("#jobInfo").css({"height": "0%"});
	$("#openbtn").css({"display": "block"});

});
