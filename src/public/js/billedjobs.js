$(function() {

/*Events*/

	$("tbody tr").click(function() {

		var id = this.id;
		var i = $(this).index();

		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
		} else {
			$("tbody tr").not(this).removeClass('selected');
			$(this).toggleClass('selected');
			}

    hideOrDisplayJobAdditionalInfoButton();

	});

  function hideOrDisplayJobAdditionalInfoButton() {
    if($(".job-additional-info").css('display') == 'none') {
      $(".job-additional-info").slideToggle('fast').removeAttr('hidden');
    } else if(!$("tbody tr").hasClass('selected')) {
      $(".job-additional-info").css('display', 'none');
    }
  }

  $(".job-additional-info").click(function() {

		var selectedid = $("tbody tr").closest('.selected').attr('id');
    getJobAdditionalInfoById(selectedid);

  });

});

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

			$(".job-info-overlay-container")
				.append('<p>Työn aloituspvm: ' + day2 + mth2 + year2 + '</p>')
				.append('<p>Työmaan koko: ' + data.data.sitesize + '</p>')
				.append('<p>Kivitöitä: ' + stoneworkflag + '</p>')
				.append('<p>Kivityön kuvaus: ' + data.data.stoneworkdescription + '</p>')
				.append('<p>Katuluokat: ' + data.data.streetcategory + '</p>')
				.append('<p>Mahdollisuus aloittaa työt: ' + data.data.completiongoal + '</p>')
				.append('<p>Haluttu valmistumispvm: ' + day + '.' + mth + '.' + year + '</p>');
			$("#jobInfo").css({"height": "100%"});
			$("#openbtn").css({"display": "none"});
			},
		error: function(data, status) {
			console.log('meni pieleen' + data);
			}
		});
	}
