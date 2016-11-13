$(function() {

/*Events*/

$("[name='stoneworkcheck']").bootstrapSwitch();

$(".bootstrap-switch, .bootstrap-switch-handle-off, .bootstrap-switch-handle-on").click(function() {
	$(".stoneworkdescription-container").slideToggle(300);
});


/*AJAX calls*/

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
	}
});