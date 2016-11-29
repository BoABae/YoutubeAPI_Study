var headerView = Backbone.View.extend({
	el:$("#header"),
	
	initialize: function(){
		this.render();
	},
	
	render : function() {
		var template = _.template($("#header_html").html(), {});
		this.$el.html(template);
	},
	events: {
		'click .search': 'search',
	},
	search: function(){
		var self = this;
		var sKeyword = $("#insertKeyword").val();
		kWord.set({keyword: sKeyword});
		$("#numberUpDown").html(1);
		$(".list-group").empty();
		searchResult.search();
		router.navigate('searchResult_html', true);
	}
});




var contentView = Backbone.View.extend({
	el:$("#content"),
	initialize: function(){
		this.render();
	},
	render: function(){
		var self = this;
		var template = _.template($("#mainContent_html").html(), {});
		this.$el.html(template);
	},
	
	activities: function(){
		var self = this;
		var request = gapi.client.youtube.activities.list({
			part: 'contentDetails, snippet',
			home: true,
			maxResult: 5,
		});
		request.execute(self.activitiesList);
		
	},
	activitiesList: function(response){
		var str = JSON.stringify(response.result);
		var obj = JSON.parse(str);

		for(i=0; i<obj.items.length; i++){
			var title = obj.items[i].snippet.title;
			var videoId = obj.items[i].contentDetails.upload.videoId;
			var thumbnails_default = obj.items[i].snippet.thumbnails.default.url;
			
			video = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoId+"'><source src='http://www.youtube.com/watch?v="+videoId+"'></video><img id=imgTD src=\""+thumbnails_default+"\"/></a>";
			$(".list-group").append("<li class='list-group-item'>" + video + title + "</li>");
		}
	}
	
});


$(document).ready(function(){
	hdView = new headerView();
	cntView = new contentView();
	myUploadVideo = new myUploadListView();
	searchResult = new youtubeSearchResult();
	myVideo = new myLikedVideoListView();
	uploadV = new uploadVideo();
	rList = new resultList();
	token = new pageToken();
	kWord = new keyword();
	router = new AppRouter();
	Backbone.history.start();
	
});