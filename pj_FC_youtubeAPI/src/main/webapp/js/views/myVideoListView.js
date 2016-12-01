var playlistId;

//유투브에서 좋아요, 나중에 볼 영상, 내가 올린 영상 등 channel을 통해 가져올 수 있는 목록을 보여줌
var myLikedVideoListView = Backbone.View.extend({
	el: $("#content"),
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template($("#myLikedVideoList_html").html(), {});
		this.$el.html(template);
	},
	events: {
		'click .nPageBtn': 'nextPage',
		'click .pPageBtn': 'prevPage'
	},
	//내가 좋아요를 누른 목록을 가져오는 함수
	playList: function(){
		var self = this;
		var request = gapi.client.youtube.channels.list({
			part: 'contentDetails',
			mine: true
		});
		request.execute(function(response){
			var str = JSON.stringify(response.result);
			var obj = JSON.parse(str);
			likeId = obj.items[0].contentDetails.relatedPlaylists.likes;
			self.requestVideoPlaylist(likeId);
		});
	},
	nextPage: function(){
		$(".list-group").empty();
		var self = this;
		var pToken = token.toJSON();
		var nextPage = pToken.nextPageToken;
		self.requestVideoPlaylist(likeId, nextPage);
		var stat = $('#numberUD').text();
        var num = parseInt(stat);
        num++;
        $('#numberUD').text(num);
        var maxPage = pToken.maxPage;
        if(num > maxPage){
        	$('#numberUD').text(1);
        }
	},
	prevPage: function(){
		$(".list-group").empty();
		var self = this;
		var pToken = token.toJSON();
		var prevPage = pToken.prevPageToken;
		self.requestVideoPlaylist(likeId, prevPage);
		var stat = $('#numberUD').text();
        var num = parseInt(stat,10);
        num--;
        if(num<=0){
        	num = 1;
        }
        $('#numberUD').text(num);
	},
	requestVideoPlaylist: function(likeId, pageToken){
		var requestOptions = {
			    playlistId: likeId,
			    part: 'contentDetails, snippet',
			    maxResults: 5,
			    pageToken: pageToken,
		};
		var request = gapi.client.youtube.playlistItems.list(requestOptions);
		request.execute(function(response){
			var str = JSON.stringify(response.result);
			var obj = JSON.parse(str);
			var t = obj.pageInfo.totalResults;
			var r = obj.pageInfo.resultsPerPage;
			var modResult = t % r;
			var maxPage = parseInt(t/r);
			if(modResult == 0){
				token.set({maxPage: maxPage});
			}else{
				token.set({maxPage: maxPage+1});
			}
			
			var nextPageToken = response.nextPageToken;
				prevPageToken =	response.prevPageToken;
			token.set({nextPageToken : nextPageToken, prevPageToken : prevPageToken});
			
			if(obj.items.length ==! 0){
			for(i=0; i< obj.items.length ; i++){
				var videoId = obj.items[i].contentDetails.videoId;
				var title = obj.items[i].snippet.title;
				var thumbnails_default = obj.items[i].snippet.thumbnails.default.url;
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
			}else{
				$(".list-group").append("<h4>좋아요 누른 동영상이 없습니다.</h4>");
			}
		});
		
	},
	
});
//내가올린 동영상 목록
var myUploadListView = Backbone.View.extend({
	el: $("#content"),
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template($("#myUploadVideoList_html").html(), {});
		this.$el.html(template);
	},

	myUploadVideoList: function(){
		var self = this;
		var request = gapi.client.youtube.activities.list({
			part: 'contentDetails, snippet',
			mine: true,
		});
		request.execute(function(response){
			var str = JSON.stringify(response.result);
			var obj = JSON.parse(str);
			console.log(obj);
			if(obj.items.length ==! 0){
				for(i=0; i<obj.items.length; i++){
					var title = obj.items[i].snippet.title;
					var videoId = obj.items[i].contentDetails.upload.videoId;
					var thumbnails_default = obj.items[i].snippet.thumbnails.default.url;
					video = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoId+"'><source src='http://www.youtube.com/watch?v="+videoId+"'></video><img id=imgTD src=\""+thumbnails_default+"\"/></a>";
					$(".list-group").append("<li class='list-group-item'>" + video + title + "</li>");
				}
				
			}else{
				$(".list-group").append("<h4>업로드한 동영상이 없습니다.</h4>");
			}
		});
	},
});