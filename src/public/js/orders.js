$(function() {

/*Events*/

$("[name='stoneworkcheck']").bootstrapSwitch();

$(".bootstrap-switch, .bootstrap-switch-handle-off, .bootstrap-switch-handle-on").click(function() {
	$(".stoneworkdescription-container").slideToggle(300);

	if($("#stoneworkdescription").prop("required")) {
		$("#stoneworkdescription").prop("required", false);
	} else {
		$("#stoneworkdescription").prop("required", true);
	}
});

$("#clientname").change(function() {
	var id = ($(this).children(":selected").attr("id"));
	if(id == "newclientname") {
		$("#newclient").slideToggle(300);
		$("#newclientinput").prop("required", true);

	}
	else {
		$("#newclientinput").val("");
		$("#newclient").css('display', 'none');
	}
});

$(".orderbutton").click(function() {
	$(".orderform").find("input, textarea, select").each(function(){
		if( $(this).prop('required') && ($(this).val() < 1) ){
			$(this).parent().addClass("has-error");
		} else {
			$(this).parent().removeClass("has-error");
		}
	if($(".orderform .form-group").hasClass("has-error")) {
		$(".mandatoryfields").css("display", "block");
		$("html, body").animate({ scrollTop: 0 }, "slow");
		console.log("scrollasi");
	} else {
		$(".mandatoryfields").css("display", "none");
		console.log("POST");
	}
	})
});


/*AJAX calls*/
/*
postOrder = 

	function postOrder(url, i) { $.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		data: {
			name: $("#kaljasakko-name" + i).val(),
			amount: $("#kaljasakko-sum" + i).val(),
			reason: $("#kaljasakko-reason" + i).val()
		},
		success: function(data, status) {
			($("#sakko" + i).attr('object-id', data));
			},
		error: function(data, status) {
			console.log(data);
			}
		})
	}*/
});