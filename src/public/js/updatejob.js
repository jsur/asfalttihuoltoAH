function jobUpdateAJAX(id, started, startdate, completed, completiondate, billed) {$.ajax({
		type: "PUT",
		url: window.location.href,
		dataType: "json",
		data: {
			id: id,
			started: started,
			startdate: startdate,
			completed: completed,
			completiondate: completiondate,
			billed: billed
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
	};