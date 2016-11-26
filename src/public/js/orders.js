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

	var page = $("html, body");

	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
       page.stop();
   }); //Let the user scroll after error message

	$(".orderform").find("input, textarea, select").each(function(){

		var a = $(this);

		if( a.prop('required') && (a.val() < 1) ){
			a.parent().addClass("has-error");
		} else {
			a.parent().removeClass("has-error");
		}
	if($(".orderform .form-group").hasClass("has-error")) {
		$(".mandatoryfields").css("display", "block");
		page.animate({ scrollTop: 0 }, "fast");
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