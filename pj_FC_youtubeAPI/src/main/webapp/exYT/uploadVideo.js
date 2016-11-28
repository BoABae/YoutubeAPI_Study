
var VIDEOS_UPLOAD_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet';


function uploadVideo(){
	initiateUpload();
}


function initiateUpload(){
	$("#submit").on('click', function(){
		var file = $("#uploadFile").get(0).files[0];
		if(file){
			var metadata = {
					snippet: {
						title: $("#title").val(),
						description: $('#description').val(),
						categoryId: 22
				}
			};
			var d = 'part=snippet&id=suhamia21&title=a&description=b&categoryId=22';
			$.ajax({
				url: 'https://www.googleapis.com/youtube/v3/videos?',
				method: 'POST',
				contentType: 'application/jsonp, charset=utf-8',
				headers: {
					Authorization: 'Bearer ' + accessToken,
					'x-upload-content-length': file.size,
					'x-upload-content-type': file.type,
					'Access-Control-Expose-Headers': Location
				},
				data: d,
			}).done(function(data, textStatus, jqXHR) {
		        console.log(jqXHR);
		        resumableUpload({
		        	url: jqXHR.getResponseHeader('Location'),
		        	file: file,
		        	start: 0,
		        });
			});
		}
	});
	$("#temp").on('click', function(){

	});
}

function resumableUpload(options){
	console.log(options);
	
	
	
	
}












