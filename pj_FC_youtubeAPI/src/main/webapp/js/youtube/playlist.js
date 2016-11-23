
function handleAPILoaded(){
	onYouTubeApiLoad();
	
}
var PageToken = true;

function onYouTubeApiLoad(){
	gapi.client.setApiKey('AIzaSyCTgS4i5yhYxHF6FbQ_DKSbyBPiALrkYpM');
	var request = gapi.client.youtube.activities.list(
            {
            part: 'snippet',
            home: true,
            });
	console.log(request);
	request.execute(onPlaylistResponse);
}

function onPlaylistResponse(response){
	console.log(response.result);
	console.log(response.items.length);
	
	var str = JSON.stringify(response.result);
	var obj = JSON.parse(str);
//	var test = obj.items[0];
//	$.each(obj.items, function(){
//		
//	});
//		$("#resultContainer").html("<li>" + test + "</li>");
		$("#testDiv").html(str);
		
	
}

