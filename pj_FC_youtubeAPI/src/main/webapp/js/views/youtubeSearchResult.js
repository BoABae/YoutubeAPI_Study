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
		$(".list-group").empty();
		self.searchYouTubeApi();
	},
	events: {
		'click #nextPageBtn': 'nextPage',
		'click #prevPageBtn': 'prevPage',
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
            var videoId = response.items[i].id.videoId;
            
            rList.set({title : title, videoId : videoId, thumbnails_default: thumbnails_default});
            
            var title = rList.get('title');
            var videoId = rList.get('videoId');
            var thumbnails_default = rList.get('thumbnails_default');
            
            if(firstPage === true){
            	video = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoId+"'><source src='http://www.youtube.com/watch?v="+videoId+"'></video><img id=imgTD src=\""+thumbnails_default+"\"/></a>";
				$(".list-group").append("<li class='list-group-item'>" + video + title+ "</li>");
            }else{
            	$(".list-group").empty();
            	video = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoId+"'><source src='http://www.youtube.com/watch?v="+videoId+"'></video><img id=imgTD src=\""+thumbnails_default+"\"/></a>";
				$(".list-group").append("<li class='list-group-item'>" + video + title+ "</li>");
            }
		}
	},
	
});
