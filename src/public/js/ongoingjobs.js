$(function() {

/*Events*/

	$("tbody tr").click(function() {

		var id = this.id;
		var i = $(this).index();

		giveJobStatusButtonStyles(id, i);

		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
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

		var selectedid = $("tbody tr").closest('.selected').attr('id');
		var i = $("tbody tr").closest('.selected').index();

		if($(".job-start").hasClass("btn-success")) {
			removeJobStatusStarted();
			updateJobStatusStarted(selectedid, i);
		} else {
			setJobStatusStarted();
			updateJobStatusStarted(selectedid, i);
		}
	});

	$(".job-ready").click(function() {

		var selectedid = $("tbody tr").closest('.selected').attr('id');
		var i = $("tbody tr").closest('.selected').index();

		if($(".job-ready").hasClass("btn-success")) {
			removeJobStatusCompleted();
			updateJobStatusCompleted(selectedid, i);
		} else {
			setJobStatusCompleted();
			updateJobStatusCompleted(selectedid, i);
		}
	});

/*Functions for events*/

	function giveJobStatusButtonStyles(id, i) {
		
		if(
			data[i].id == id && 
			data[i].started == true && 
			data[i].completed == true &&
			$(".job-start, .job-ready").hasClass('btn-default')
			) {
			
			//If only final billing is needed
			$(".job-start, .job-ready").removeClass('btn-default');
			setJobStatusStarted();
			setJobStatusCompleted();
			console.log('vain laskutus puuttuu');

		} else if (
			data[i].id == id && 
			data[i].started == true && 
			data[i].completed == false //&&
			) {

			//If job has only been started
			$(".job-start").removeClass('btn-default');
			setJobStatusStarted();
			if (!$(".job-start").hasClass('btn-success')) {
				$(".job-start").addClass('btn-success');
			}
			$(".job-start").removeAttr('disabled');
			console.log('työ aloitettu');

		} else if (
			data[i].id == id && 
			data[i].started == false && 
			data[i].completed == false
			) {
			removeJobStatusCompleted();
			removeJobStatusStarted();
			console.log('työtä ei ole aloitettu');
		} else {
			console.log('mikä homma?');
		}
	};

	function setJobStatusStarted() {
		$(".job-start").
			toggleClass("btn-success").
			html("Aloitettu").
			append("<span class='glyphicon glyphicon-ok'></span>");
		$(".job-ready").removeAttr('disabled');
		$(".job-ready").removeClass('btn-success');
		$(".job-ready").addClass('btn-default');
	}

	function removeJobStatusStarted() {
		$(".job-start").
			removeClass("btn-success").
			addClass("btn-default").
			html("Aloita työ").
			append("<span class='glyphicon glyphicon-play'></span>");
		$(".job-ready").attr('disabled', 'true');
	}

	function setJobStatusCompleted() {
		$(".job-ready").
			toggleClass("btn-success").
			html("Työ valmis!").
			append("<span class='glyphicon glyphicon-ok'></span>");
		$(".job-billed").removeAttr('disabled');
		$(".job-start").attr('disabled', 'true');
		$(".job-start").addClass('btn-success');
	}

	function removeJobStatusCompleted() {
		$(".job-ready").
			removeClass("btn-success").
			addClass("btn-default").
			html("Aseta valmiiksi").
			append("<span class='glyphicon glyphicon-flag'></span>");
		$(".job-billed").attr('disabled', 'true');
		$(".job-start").removeAttr('disabled');
	}

});


/*AJAX calls for button actions*/

var date = new Date();
var datestring = date.toISOString().substr(0, 10);

//only started = true

function updateJobStatusStarted(selectedid, i) {

	if(data[i].id == selectedid && data[i].started == false) {
		jobUpdateAJAX(
				selectedid, //id
				true, //started
				datestring //startdate
			);
	} else if (data[i].id == selectedid && data[i].started == true) {
		jobUpdateAJAX(
				selectedid, //id
				false, //started
				'0001-01-01' //startdate
			);
	}
};

//started and completed = true

function updateJobStatusCompleted(selectedid, i) {

	if(data[i].id == selectedid && data[i].started == true && data[i].completed == false) {
		jobUpdateAJAX(
				selectedid, //id
				data[i].started, //started
				data[i].startdate, //startdate
				true, //completed
				datestring, //completiondate
				false //billed
			);
	} else if (data[i].id == selectedid && data[i].started == true && data[i].completed == true) {
		jobUpdateAJAX(
				selectedid, //id
				data[i].started, //started
				data[i].startdate, //startdate
				false, //completed
				'0001-01-01', //completiondate
				false //billed
			);
	}
};