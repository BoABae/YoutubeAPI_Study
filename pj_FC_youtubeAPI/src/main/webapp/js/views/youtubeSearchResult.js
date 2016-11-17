var nextPageToken, prevPageToken;
var type = $(this).attr('count_range');


var youtubeSearchResult = Backbone.View.extend({
	el:$("#content"),
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template($("#searchResult_html").html(), {});
		this.$el.html(template);
	},
	events: {
		'click #search': 'search',
		'click #nextPageBtn': 'nextPage',
		'click #prevPageBtn': 'prevPage',
	},
	
	search: function(){
		var self = this;
		//$(".list-group").remove();
		gapi.client.load('youtube', 'v3', function(){
			gapi.client.setApiKey('AIzaSyCTgS4i5yhYxHF6FbQ_DKSbyBPiALrkYpM');
			self.searchYouTubeApi();
			
		});
		
	},
	
	nextPage: function(){
		console.log("nextpage");
		this.searchYouTubeApi(nextPageToken);
		var stat = $('#numberUpDown').text();
        var num = parseInt(stat,10);
        num++;
        console.log(num);
        $('#numberUpDown').text(num);
	},
	prevPage: function(){
		this.searchYouTubeApi(prevPageToken);
		var stat = $('#numberUpDown').text();
        var num = parseInt(stat,10);
        num--;
        $('#numberUpDown').text(num);
        if(num<=0){
        num =1;
        }
        console.log(num);
	},
	searchYouTubeApi: function(PageToken){
		console.log("hihi");
		var self = this;
		var sKeyword = $("#searchKeyword").val();
		console.log(sKeyword);
		var request = gapi.client.youtube.search.list(
	            {
	            part: 'snippet',
	            q:sKeyword,
	            maxResults:5,
	            pageToken:PageToken
	            });
		request.execute(self.onSearchResponse);
	
	},
	onSearchResponse: function(response){
		console.log(response);
		var responseString = JSON.stringify(response, '', 1);
		for(i = 0; i< response.items.length; i++){
			var publishedAt = response.items[i].snippet.publishedAt;
			var channelId = response.items[i].snippet.channelId;
			var title = response.items[i].snippet.title;
			var description = response.items[i].snippet.description;
			var thumbnails_default = response.items[i].snippet.thumbnails.default.url;
            var thumbnails_medium = response.items[i].snippet.thumbnails.medium.url;
            var thumbnails_high = response.items[i].snippet.thumbnails.high.url;
            var channelTitle = response.items[i].snippet.channelTitle;
            var liveBroadcastContent = response.items[i].snippet.liveBroadcastContent;
            var videoID = response.items[i].id.videoId;
            
            content = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoID+"'><source src='http://www.youtube.com/watch?v="+videoID+"'></video><img id=imgTD src=\""+thumbnails_default+"\"/></a>";
            $(".list-group").append("<li class='list-group-item'>" + content + "</li>");
		}
	},
	
	
});