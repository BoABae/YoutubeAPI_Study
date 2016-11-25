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
	events: {
		'click #loadvideo': 'loadvideo',
		'click #search': 'search',
	},
	loadvideo: function(){
		router.navigate('uploadVideo_html', true);
	},
	search: function(){
		router.navigate('searchResult_html', true);
	},
	activities: function(){
		console.log("activities");
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
			var t = obj.items[i].snippet.title;
			var v = obj.items[i].contentDetails.upload.videoId;
			
			emVideo = "<iframe id=ytplayer src='http://www.youtube.com/embed/" + v +"' frameborder=0/>"
        	$(".list-group").append("<li class='list-group-item'>" + emVideo + t + "</li>");
		}
	}
});


$(document).ready(function(){
	hdView = new headerView();
	cntView = new contentView();
	uploadV = new uploadVideo();
	searchResult = new youtubeSearchResult();
	myVideo = new myVideoListView();
	
	
	rList = new resultList();
	token = new pageToken();
	kWord = new keyword();
	router = new AppRouter();
	Backbone.history.start();
	
	
});