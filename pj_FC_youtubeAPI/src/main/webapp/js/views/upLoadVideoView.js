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
		console.log("hi");
		$('.progress').show();
		$('.progress-bar').addClass("progress-bar-striped active");
	},
	render: function(){
		var template = _.template($("#uploadVideo_html").html(), {});
		this.$el.html(template);
		$('.during-upload').hide();
		$('.progress').hide();
	},
	
	videoUploadReady: function(){
		var self = this;
		$("#submit").on('click', function(){
			
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
			}else{
				alert("file을 선택해주세요");
			}
		});
	},
	resumableUpload: function(options){
		var self = this;
		var ajax = $.ajax({
		      url: options.url,
		      method: 'PUT',
		      contentType: options.file.type,
		      headers: {
		        'Content-Range': 'bytes ' + options.start + '-' + (options.file.size - 1) + '/' + options.file.size
		      },
		      xhr: function() {
		        var xhr = $.ajaxSettings.xhr();
		        if (xhr.upload) {
		        	xhr.upload.addEventListener('progress', function(e){
		        		if(e.lengthComputable){
		        			var bytesTransferred = e.loaded;
			                var totalBytes = e.total;
			                var percentage = Math.round(100 * bytesTransferred / totalBytes);
			                $('.progress').show();
			                $(".progress-bar").attr({
			                	'style': 'width :' + percentage + '%',
			                });
		        		}
		        		
		        	},
		        	false
		        	);
		        }
		        return xhr;
		      },
		      processData: false,
		      data: options.file
		    });

		    ajax.done(function(response) {
		    	$("#uploading").html("업로딩중 잠시만 기다려 주세요!");
		    	$('.progress-bar').addClass("progress-bar-striped active");
		    	videoId = response.id;
		    	self.checkVideoStatus(videoId, INITIAL_STATUS_POLLING_INTERVAL_MS);
		    });
	},
	checkVideoStatus: function(videoId, waitFornextPoll){
		var self = this;
		$.ajax({
			url: VIDEOS_SERVICE_URL,
		      method: 'GET',
		      headers: {
		        Authorization: 'Bearer ' + accessToken
		      },
		      data: {
		        part: 'status,processingDetails,player',
		        id: videoId
		      }
		}).done(function(response){
			var uploadStatus = response.items[0].status.uploadStatus;
			var embed = response.items[0].player.embedHtml;
			console.log(embed);
			console.log(uploadStatus);
			if(uploadStatus == 'uploaded'){
				setTimeout(function(){
					self.checkVideoStatus(videoId, waitFornextPoll * 2);
				}, waitFornextPoll);
			}else{
				if(uploadStatus == 'processed'){
					console.log("finally completed!");
					$("#uploading").hide();
					$(".progress-bar").removeClass("progress-bar-striped active");
					$('.container').find('.embed-responsive').append(embed);
					
				}
			}
		});
	},
});