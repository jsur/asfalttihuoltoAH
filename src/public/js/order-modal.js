/*http://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_bottom*/
var url = window.location.href;
var modal = document.getElementById('order-modal-id');
var btn = document.getElementById("order-button-id");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

/*jQuery events*/

$(function() {

	var orderbutton = $(".confirm");

	orderbutton.click(function () {

    orderbutton.prop('disabled', true);

    const fileinput = $('#fileinput');
    const file = fileinput[0].files[0];

		$.get(`${url}sign-s3`, { 'file-name': file.name, 'file-type': file.type }, function(data) {
      const datajson = JSON.parse(data);
      const signedRequest = datajson.signedRequest;
      const url = datajson.url;
      uploadFile(file, signedRequest, url);
		});
  });

  function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {

      if(xhr.readyState === 4){
        if(xhr.status === 200){
          $('#fileurl').val(url);
          postOrder();
        }
        else{
          $("#post-order-button").after("<span class='errormsg'> Virhe tallennuksessa! Ota yhteys ylläpitoon.</span>");
          console.log(data);
        }
      }
    };
    xhr.send(file);
  }
  

	$(".go-back").click(function() {
		modal.style.display = "none";
	});

	function refresh() {
		setTimeout(function () {
		location.reload();
		}, 3000);
	}

	function postOrder() {
		$.ajax({
			type: 'POST',
			url: url,
			dataType: 'json',
			data: {
				id: '',
				clientname: $("#clientname").val(),
				address: $("#address").val(),
				orderdate: $("#orderdate").val(),
				sitesize: $("#sitesize").val(),
				stonework: $("#stoneworkcheckid").is(':checked'),
				stoneworkdescription: $("#stoneworkdescription").val(),
				streetcategory: $("#streetcategories").val(),
				completiongoal: $("#completiongoal").val(),
				completiondate: $("#completiondate").val(),
				fileurl: $('#fileurl').val()
			},
			success: function(data, status) {
				modal.style.display = "none";
				$("html, body").animate({ scrollTop: 0 }, "fast");
				$(".postsuccess").css("display", "block");
				console.log("Order complete.");
				$(".orderform :input").prop("disabled", true);
				refresh();
			},
			error: function(data, status) {
				$("#post-order-button").after("<span class='errormsg'> Virhe tallennuksessa! Ota yhteys ylläpitoon.</span>");
				console.log(data);
			}
		})
	}
});
