// at https://console.developers.google.com/.
var GOOGLE_PLUS_SCRIPT_URL = 'https://apis.google.com/js/client:plusone.js';
var CHANNELS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/channels';
var VIDEOS_UPLOAD_SERVICE_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet';
var VIDEOS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/videos';
var INITIAL_STATUS_POLLING_INTERVAL_MS = 15 * 1000;
var OAUTH2_CLIENT_ID = '63003107558-ft047cvll1gasan36pbnf7m2cm7547db.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
	gapi.auth.init(function() {
	    window.setTimeout(checkAuth, 1);
	  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true,
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
	  
	  if (authResult['access_token']) {
	      accessToken = authResult['access_token'];
	      console.log(accessToken);
	      $.ajax({
	        url: CHANNELS_SERVICE_URL,
	        method: 'GET',
	        headers: {
	          Authorization: 'Bearer ' + accessToken
	        },
	        data: {
	          part: 'snippet',
	          mine: true
	        }
	      }).done(function() {
	        
	        uploadV.videoUploadReady();
	      });
	    }
	  
	 
    $('.pre-auth').hide();
    $('.post-auth').show();
    
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
        }, handleAuthResult);
    });
  }
}
function loadAPIClientInterfaces() {
	  gapi.client.load('youtube', 'v3', function(){
		  uploadReady();
	  });
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
// function loadAPIClientInterfaces() {
// handleAPILoaded();
// }
function uploadReady(){
  


  function initiateUpload(e) {
    e.preventDefault();

    var file = $('#file').get(0).files[0];
    if (file) {
      $('#submit').attr('disabled', true);

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
        resumableUpload({
          url: jqXHR.getResponseHeader('Location'),
          file: file,
          start: 0
        });
      });
    }
  }

  function resumableUpload(options) {
    var ajax = $.ajax({
      url: options.url,
      method: 'PUT',
      contentType: options.file.type,
      headers: {
        'Content-Range': 'bytes ' + options.start + '-' + (options.file.size - 1) + '/' + options.file.size
      },
      xhr: function() {
        // Thanks to http://stackoverflow.com/a/8758614/385997
        var xhr = $.ajaxSettings.xhr();

        if (xhr.upload) {
          xhr.upload.addEventListener(
            'progress',
            function(e) {
              if(e.lengthComputable) {
                var bytesTransferred = e.loaded;
                var totalBytes = e.total;
                var percentage = Math.round(100 * bytesTransferred / totalBytes);

                $('#upload-progress').attr({
                  value: bytesTransferred,
                  max: totalBytes
                });

                $('#percent-transferred').text(percentage);
                $('#bytes-transferred').text(bytesTransferred);
                $('#total-bytes').text(totalBytes);

                $('.during-upload').show();
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
      var videoId = response.id;
      $('#video-id').text(videoId);
      $('.post-upload').show();
      checkVideoStatus(videoId, INITIAL_STATUS_POLLING_INTERVAL_MS);
    });

    ajax.fail(function() {
      $('#submit').click(function() {
        alert('Not yet implemented!');
      });
      $('#submit').val('Resume Upload');
      $('#submit').attr('disabled', false);
    });
  }

  function checkVideoStatus(videoId, waitForNextPoll) {
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
    }).done(function(response) {
      var processingStatus = response.items[0].processingDetails.processingStatus;
      var uploadStatus = response.items[0].status.uploadStatus;

      $('#post-upload-status').append('<li>Processing status: ' + processingStatus + ', upload status: ' + uploadStatus + '</li>');

      if (processingStatus == 'processing') {
        setTimeout(function() {
          checkVideoStatus(videoId, waitForNextPoll * 2);
        }, waitForNextPoll);
      } else {
        if (uploadStatus == 'processed') {
          $('#player').append(response.items[0].player.embedHtml);
        }

        $('#post-upload-status').append('<li>Final status.</li>');
      }
    });
  }

  $(function() {
    $.getScript(GOOGLE_PLUS_SCRIPT_URL);

    $('#upload-form').submit(initiateUpload);
  });
}