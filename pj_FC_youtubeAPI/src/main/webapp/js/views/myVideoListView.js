var playlistId, nextPageToken, prevPageToken;
var myVideoListView = Backbone.View.extend({
	el: $("#content"),
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template($("#myVideoList_html").html(), {});
		this.$el.html(template);
	},
	//내가올린 동영상 목록 가져오는 함수
	playList: function(){
		var self = this;
		var request = gapi.client.youtube.channels.list({
			part: 'contentDetails',
			mine: true
		});
		request.execute(function(response){
			var str = JSON.stringify(response.result);
			var obj = JSON.parse(str);
			
			playlistId = obj.items[0].contentDetails.relatedPlaylists.uploads;
			console.log(playlistId);
			self.requestVideoPlaylist(playlistId);
		});
		
	},
	requestVideoPlaylist: function(playlistId, pageToken){
		var requestOptions = {
			    playlistId: playlistId,
			    part: 'contentDetails, snippet',
			    maxResults: 5
		};
		if(pageToken){
			requestOption.pageToken = pageToken;
		}
		
		var request = gapi.client.youtube.playlistItems.list(requestOptions);
		
		request.execute(function(response){
			nextPageToken = response.result.nextPageToken;
			prevPageToken = response.result.prevPageToken;
			var str = JSON.stringify(response.result);
			var obj = JSON.parse(str);
			console.log(obj.items[0].contentDetails.videoId);
			
			for(i=0; i< obj.items.length ; i++){
				var videoId = obj.items[i].contentDetails.videoId;
				thumbnails_default = obj.items[i].snippet.thumbnails.medium.url;
				
				video = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoId+"'><source src='http://www.youtube.com/watch?v="+videoId+"'></video><img id=imgTD src=\""+thumbnails_default+"\"/></a>";
				$(".list-group").append("<li class='list-group-item'>" + video + title+ "</li>");
			}
		});
		
	},
});