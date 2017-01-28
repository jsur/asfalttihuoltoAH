$(function() {

/*Events*/

	$("tbody tr").click(function() {


		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			$(".job-start").attr('disabled', 'true');
		} else {
			$("tbody tr").not(this).removeClass('selected');
			$(this).toggleClass('selected');
			$(".job-start").removeAttr('disabled');
			$(".container-fluid").addClass('container-fluid-row-edit');
			if($(".job-statusgroup-container").attr("hidden")) {
				$(".job-statusgroup-container").slideToggle("fast").removeAttr("hidden");
			}
		}
	});

	$(".job-start").click(function() {

		if($(".job-start").hasClass("btn-success")) {
			$(".job-start").
				removeClass("btn-success").
				html("Aloita työ").
				append("<span class='glyphicon glyphicon-play'></span>");
			$(".job-ready").attr('disabled', 'true');
		} else {
			$(".job-start").
				toggleClass("btn-success").
				html("Aloitettu").
				append("<span class='glyphicon glyphicon-ok'></span>");
			$(".job-ready").removeAttr('disabled');
		}
	});

	$(".job-ready").click(function() {

		if($(".job-ready").hasClass("btn-success")) {
			$(".job-ready").
				removeClass("btn-success").
				html("Aseta valmiiksi").
				append("<span class='glyphicon glyphicon-flag'></span>");
			$(".job-billed").attr('disabled', 'true');
		} else {
			$(".job-ready").
				toggleClass("btn-success").
				html("Työ valmis!").
				append("<span class='glyphicon glyphicon-ok'></span>");
			$(".job-billed").removeAttr('disabled');
		}
	});


});


/*AJAX calls for button actions*/