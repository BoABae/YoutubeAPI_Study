// The client ID is obtained from the Google Developers Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.

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
	var CHANNELS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/channels';
	
	if(authResult['access_token']){
		accessToken = authResult['access_token'];
		$.ajax({
			url: CHANNELS_SERVICE_URL,
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + accessToken
			},
			data: {
				part: 'snippet',
				mine: true,
			}
		}).done(function(response){
			$("#channelName").html(response.items[0].snippet.title);
			$("#channelThumbnails").html(response.items[0].snippet.thumbnails.default.url);
			
			
			$('.pre-auth').hide();
			$('.post-auth').show();
			
			loadAPIClientInterfaces();
		});
	}
	
	
	
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
		  uploadVideo();
	  });
}


// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
//function loadAPIClientInterfaces() {
//	handleAPILoaded();
//}