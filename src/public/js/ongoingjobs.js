$(function() {

/*Events*/

	$("tbody tr").click(function() {

		var id = this.id;
		var i = $(this).index();

		giveJobStatusButtonStyles(id, i);
		console.log(id, i);

		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			$(".job-start").attr('disabled', 'true');
		} else {
			$("tbody tr").not(this).removeClass('selected');
			$(this).toggleClass('selected');
			$(".container-fluid").addClass('container-fluid-row-edit');
			}

		if($(".job-statusgroup-container").attr("hidden")) {
			$(".job-statusgroup-container").slideToggle('fast').removeAttr('hidden');
		} else if(!$("tbody tr").hasClass('selected')) {
			$(".job-statusgroup-container").slideToggle('fast').attr('hidden', 'true');
		}
	});

	$(".job-start").click(function() {

		if($(".job-start").hasClass("btn-success")) {
			removeJobStatusStarted();
		} else {
			setJobStatusStarted();
		}
	});

	$(".job-ready").click(function() {

		if($(".job-ready").hasClass("btn-success")) {
			removeJobStatusReady();
		} else {
			setJobStatusReady();
		}
	});

/*Functions for events*/

	function giveJobStatusButtonStyles(id, i) {
		
		if(data[i].id == id && data[i].started == false && data[i].completed == false) {
			//If only final billing is needed
			$(".job-ready").removeAttr('disabled');
			setJobStatusStarted();
			setJobStatusReady();

		} else if (data[i].id == id && data[i].started == true && data[i].completed == false) {
			//If job has only been started
			setJobStatusStarted();
		} else {
			$(".job-start").removeAttr('disabled');
			console.log('meni tänne');
		}
	};

	function setJobStatusStarted() {
		$(".job-start").
			toggleClass("btn-success").
			html("Aloitettu").
			append("<span class='glyphicon glyphicon-ok'></span>");
		$(".job-ready").removeAttr('disabled');
	}

	function removeJobStatusStarted() {
		$(".job-start").
			removeClass("btn-success").
			html("Aloita työ").
			append("<span class='glyphicon glyphicon-play'></span>");
		$(".job-ready").attr('disabled', 'true');
	}

	function setJobStatusReady() {
		$(".job-ready").
			toggleClass("btn-success").
			html("Työ valmis!").
			append("<span class='glyphicon glyphicon-ok'></span>");
		$(".job-billed").removeAttr('disabled');
		$(".job-start").attr('disabled', 'true');
	}

	function removeJobStatusReady() {
		$(".job-ready").
			removeClass("btn-success").
			html("Aseta valmiiksi").
			append("<span class='glyphicon glyphicon-flag'></span>");
		$(".job-billed").attr('disabled', 'true');
		$(".job-start").removeAttr('disabled');
	}

});


/*AJAX calls for button actions*/

