var firstPage=true;

var youtubeSearchResult = Backbone.View.extend({
	el:$("#content"),
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template($("#searchResult_html").html(), {});
		this.$el.html(template);
	},
	search: function(){
		var self = this;
		console.log("search");
		$(".list-group").empty();
		gapi.client.load('youtube', 'v3', function(){
			gapi.client.setApiKey('AIzaSyCTgS4i5yhYxHF6FbQ_DKSbyBPiALrkYpM');
			self.searchYouTubeApi();
		});
	},
	events: {
		'click #nextPageBtn': 'nextPage',
		'click #prevPageBtn': 'prevPage',
		'click #temp': 'temp'
	},
	temp: function(){
		console.log('hi');
	},
	
	nextPage: function(){
		
		$(".list-group").empty();
		var self = this;
		var pToken = token.toJSON();
		var nextPage = pToken.nextPageToken;
		console.log(nextPage);
		self.searchYouTubeApi(nextPage);
		
		var stat = $('#numberUpDown').text();
        var num = parseInt(stat);
        num++;
        $('#numberUpDown').text(num);
        
	},
	prevPage: function(){
		$(".list-group").empty();
		var self = this;
		var pToken = token.toJSON();
		var prevPage = pToken.prevPageToken;
		console.log(prevPage);
		self.searchYouTubeApi(prevPage);
		var stat = $('#numberUpDown').text();
		
        var num = parseInt(stat,10);
        num--;
        if(num<=0){
        	num = 1;
        }
        $('#numberUpDown').text(num);
	},
	searchYouTubeApi: function(PageToken){
		var self = this;
		var sKeyword = kWord.get('keyword');
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
		var responseString = JSON.stringify(response, '', 1);
		var nextPageToken = response.nextPageToken;
			prevPageToken=response.prevPageToken;
		token.set({nextPageToken : nextPageToken, prevPageToken : prevPageToken});

		for(i = 0; i< response.items.length; i++){
			var title = response.items[i].snippet.title;
			var thumbnails_default = response.items[i].snippet.thumbnails.default.url;
            var videoID = response.items[i].id.videoId;
            
            rList.set({title : title, videoId : videoID, thumbnails_default: thumbnails_default});
            
            var t = rList.get('title');
            var v = rList.get('videoId');
            var d = rList.get('thumbnails_default');
            
            if(firstPage === true){
            	video = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+ v +"'><source src='http://www.youtube.com/watch?v="+ v +"'></video><img id=imgTD src=\""+ d +"\"/></a>";
            	$(".list-group").append("<li class='list-group-item'>" + video + t + "</li>");
            }else{
            	$(".list-group").empty();
            	video = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+ v +"'><source src='http://www.youtube.com/watch?v="+ v +"'></video><img id=imgTD src=\""+ d +"\"/></a>";
            	$(".list-group").append("<li class='list-group-item'>" + video + t + "</li>");
            }
		}
	},
	
});
