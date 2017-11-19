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

		hideOrDisplayJobStatusButtons();
		hideOrDisplayJobAdditionalInfoButton();

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
			data[i].started === true &&
			data[i].completed === true &&
			$(".job-start, .job-ready").hasClass('btn-default')) {

			//If only final billing is needed
			$(".job-start, .job-ready").removeClass('btn-default');
			setJobStatusStarted();
			setJobStatusCompleted();
			console.log('vain laskutus puuttuu');

		} else if (
			data[i].id == id &&
			data[i].started === true &&
			data[i].completed === false) {

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
			data[i].started === false &&
			data[i].completed === false
			) {
			removeJobStatusCompleted();
			removeJobStatusStarted();
			console.log('työtä ei ole aloitettu');
		} else {
			console.log('mikä homma?');
		}
	}

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

	function hideOrDisplayJobStatusButtons() {
		if($(".job-statusgroup-container").attr("hidden")) {
			$(".job-statusgroup-container").slideToggle('fast').removeAttr('hidden');
		} else if(!$("tbody tr").hasClass('selected')) {
			$(".job-statusgroup-container").slideToggle('fast').attr('hidden', 'true');
		}
	}

	function hideOrDisplayJobAdditionalInfoButton() {
		if($(".job-additional-info").css('display') == 'none') {
			$(".job-additional-info").slideToggle('fast').removeAttr('hidden');
		} else if(!$("tbody tr").hasClass('selected')) {
			$(".job-additional-info").slideToggle('fast').css('display', 'none');
		}
	}

});

/*AJAX calls for button actions*/

var date = new Date();
var datestring = date.toISOString().substr(0, 10);

//only started = true

function updateJobStatusStarted(selectedid, i) {

	if(data[i].id == selectedid && data[i].started === false) {

		if(data[i].original_startdate === null) {
			var originalstartdate;
			originalstartdate = datestring;

			//Update original start date only once.
			jobUpdateAJAX(
					selectedid, //id
					true, //started
					datestring, //startdate
					false, //completed
					'0001-01-01', //actual_completion_date
					false, //billed
					originalstartdate //original_startdate
				);
		} else {
			jobUpdateAJAX(
					selectedid, //id
					true, //started
					datestring, //startdate
					false, //completed
					'0001-01-01', //actual_completion_date
					false //billed
				);
		}

	} else if (data[i].id == selectedid && data[i].started === true) {
		jobUpdateAJAX(
				selectedid, //id
				false, //started
				'0001-01-01', //startdate
				false, //completed
				'0001-01-01', //actual_completion_date
				false //billed
				//original_startdate
			);
	}
}

//started and completed = true

function updateJobStatusCompleted(selectedid, i) {

	if(data[i].id == selectedid && data[i].started === true && data[i].completed === false) {
		jobUpdateAJAX(
				selectedid, //id
				data[i].started, //started
				data[i].startdate, //startdate
				true, //completed
				datestring, //actual_completion_date
				false //billed
				//original_startdate
			);
	} else if (data[i].id == selectedid && data[i].started === true && data[i].completed === true) {
		jobUpdateAJAX(
				selectedid, //id
				data[i].started, //started
				data[i].startdate, //startdate
				false, //completed
				'0001-01-01', //actual_completion_date
				false //billed
				//original_startdate
			);
	}
}

function getJobAdditionalInfoById(i) {$.ajax({
		type: "GET",
		url: window.location.origin + '/api/avoimet-by-id',
		dataType: "json",
		data: {
			id: i,
		},
		success: function(data, status) {
			$(".job-info-overlay-container").empty();

			var str = data.data.completiondate;
			var date = new Date(str);
			var day = date.getDate();
			var mth = date.getMonth() + 1;
			var year = date.getFullYear();

			var str2;
			var date2;
			var day2;
			var mth2;
			var year2;

			if(data.data.original_startdate !== null) {
				str2 = data.data.original_startdate;
				date2 = new Date(str2);
				day2 = date2.getDate() + '.';
				mth2 = date2.getMonth() + 1 + '.';
				year2 = date2.getFullYear();
			} else {
				day2 = 'Aloituspäivää ';
				mth2 = 'ei ';
				year2 = 'annettu.';
			}

			var stoneworkflag = '';
			if(data.data.stonework === true) {
				stoneworkflag = 'Kyllä';
			} else {
				stoneworkflag = 'Ei';
			}

			const file = data.data.fileurl || undefined;

			$(".job-info-overlay-container")
				.append('<p>Työn aloituspvm: ' + day2 + mth2 + year2 + '</p>')
				.append('<p>Työmaan koko: ' + data.data.sitesize + '</p>')
				.append('<p>Kivitöitä: ' + stoneworkflag + '</p>')
				.append('<p>Kivityön kuvaus: ' + data.data.stoneworkdescription + '</p>')
				.append('<p>Katuluokat: ' + data.data.streetcategory + '</p>')
				.append('<p>Mahdollisuus aloittaa työt: ' + data.data.completiongoal + '</p>')
				.append('<p>Haluttu valmistumispvm: ' + day + '.' + mth + '.' + year + '</p>');

			if(file) {
				$(".job-info-overlay-container")
					.append(`<p> <a id="overlay-fileurl" target="_blank" href="${file}">Avaa liite: <span class="glyphicon glyphicon-download"></span> </a> </p>`);
			}
			$("#jobInfo").css({"height": "100%"});
			$("#openbtn").css({"display": "none"});
			},
		error: function(data, status) {
			console.log('meni pieleen' + data);
			}
		});
	}
