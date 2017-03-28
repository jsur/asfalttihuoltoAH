function jobUpdateAJAX(id, started, startdate, completed, actual_completion_date, billed, original_startdate) {$.ajax({
		type: "PUT",
		url: window.location.href,
		dataType: "json",
		data: {
			id: id,
			started: started,
			startdate: startdate,
			completed: completed,
			actual_completion_date: actual_completion_date,
			billed: billed,
			original_startdate: original_startdate
		},
		success: function(data, status) {
			console.log("Job " + id + " updated.");
			window.location.reload();
			},
		error: function(data, status) {
			console.log("Job update failed! " + "id: " + id + ". " + data.status + " " + data.statusText + ".");
			$(".job-update-failed").css("display", "block");
			}
		});
	}
