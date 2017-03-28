$(function() {

/*Events*/

$("#sitesize").blur(function() {
	var numeric = $("#sitesize").val();
	if(!$.isNumeric(numeric)) {
		$("#sitesize").val("");
		}
	});

$("[name='stoneworkcheck']").bootstrapSwitch();

$(".bootstrap-switch, .bootstrap-switch-handle-off, .bootstrap-switch-handle-on").click(function() {
	$(".stoneworkdescription-container").slideToggle(300);

	if($("#stoneworkdescription").prop("required")) {
		$("#stoneworkdescription").prop("required", false);
	} else {
		$("#stoneworkdescription").prop("required", true);
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
	});

	if($(".orderform .form-group").hasClass("has-error")) {
		$(".mandatoryfields").css("display", "block");
		page.animate({ scrollTop: 0 }, "fast");
	} else {
		$(".mandatoryfields").css("display", "none");
		$(".modal").css("display", "block");
		}
	});
});
