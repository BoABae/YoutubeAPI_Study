// The client ID is obtained from the Google Developers Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.

var OAUTH2_CLIENT_ID = 'yourClientId!';
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
var GOOGLE_PLUS_SCRIPT_URL = 'https://apis.google.com/js/client:plusone.js';
var CHANNELS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/channels';
var VIDEOS_UPLOAD_SERVICE_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet';
var VIDEOS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/videos';
var INITIAL_STATUS_POLLING_INTERVAL_MS = 15 * 1000;
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
	        
	    	  loadAPIClientInterfaces();
	      });
	    }
    $('.pre-auth').hide();
    $('.post-auth').show();
    
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
		  cntView.activities();
		  onLoadAuth();
		  
	  });
}

function onLoadAuth(){
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
//function loadAPIClientInterfaces() {
//	handleAPILoaded();
//}