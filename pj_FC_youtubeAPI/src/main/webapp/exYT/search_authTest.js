function handleAPILoaded() {
  $("#search").on('click', function(){
	  var request = gapi.client.youtube.activities.list({
			part: 'contentDetails, snippet',
			home: true,
			maxResult: 5,
		});

	  request.execute(function(response) {
		 var str = JSON.stringify(response.result);
		var obj = JSON.parse(str);
		console.log(obj.items.length);
		
		var url = obj.items[1].snippet.thumbnails.default.url;
		var videoID = obj.items[1].contentDetails.upload.videoId;
		$("#test1").append("<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoID+"'><source src='http://www.youtube.com/watch?v="+videoID+"'></video><img id=imgTD src=\""+url+"\"/></a>");
		$("#test").append("<div>"+ obj.items[0].snippet.title + "</div>");
		
		
	  }); 
  });
}
