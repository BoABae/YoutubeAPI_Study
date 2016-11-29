function activitiesView(){
		var request = gapi.client.youtube.activities.list({
			part: 'snippet',
			home: true
		});
		
		request.execute(function(response){
			console.log(response);
		});
		
	
}