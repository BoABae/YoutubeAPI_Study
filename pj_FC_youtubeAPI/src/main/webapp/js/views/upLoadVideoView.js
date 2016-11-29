var GOOGLE_PLUS_SCRIPT_URL = 'https://apis.google.com/js/client:plusone.js';
var CHANNELS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/channels';
var VIDEOS_UPLOAD_SERVICE_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet';
var VIDEOS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/videos';
var INITIAL_STATUS_POLLING_INTERVAL_MS = 15 * 1000;

var uploadVideo = Backbone.View.extend({
	el:$("#content"),
	initialize: function(){
		this.render();
	},
	events: {
		'click #temp': 'temp'
	},
	temp: function(){
		$('.progress').show();
	},
	render: function(){
		var template = _.template($("#uploadVideo_html").html(), {});
		this.$el.html(template);
		$('.progress').hide();
	},
	videoUploadReady: function(){
		var self = this;
		console.log("upload");
		$("#submit").on('click', function(){
			console.log('temp');
			var file = $('#file').get(0).files[0];
			if(file){
				var metadata = {
						snippet: {
							title: $('#title').val(),
							description: $('#description').val(),
							categoryId: 22
						}
				};
				
				$.ajax({
					url: VIDEOS_UPLOAD_SERVICE_URL,
					method: 'POST',
					contentType: 'application/json',
					headers: {
						Authorization: 'Bearer ' + accessToken,
						'x-upload-content-length': file.size,
						'x-upload-content-type': file.type
					},
					data: JSON.stringify(metadata)
				}).done(function(data, textStatus, jqXHR) {
					self.resumableUpload({
						url: jqXHR.getResponseHeader('Location'),
						file: file,
						start: 0
					});
				});
			}
		});
	},
	resumableUpload: function(options){
		console.log(options.url);
		$.ajax({
			url: options.url,
			method: 'PUT',
			contentType: options.file.type,
		    headers: {
		        'Content-Range': 'bytes ' + options.start + '-' + (options.file.size - 1) + '/' + options.file.size
		    },
		    xhr: function(){
		    	var xhr = $.ajaxSettins.xhr();
		    	$('.progress').show();
		    },
		    processData: false,
		    data: options.file
		}).done(function(response){
			console.log(response);
		});
	}
});