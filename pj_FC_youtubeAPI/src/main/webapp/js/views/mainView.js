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
		var template = _.template($("#mainContent_html").html(), {});
		this.$el.html(template);
	},
	events: {
		'click #loadvideo': 'loadvideo',
		'click #search': 'search'
	},
	loadvideo: function(){
		router.navigate('uploadVideo_html', true);
	},
	search: function(){
		router.navigate('searchResult_html', true);
	}
});


var uploadVideo = Backbone.View.extend({
	el:$("#content"),
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template($("#uploadVideo_html").html(), {});
		this.$el.html(template);
	}
});



$(document).ready(function(){
	var hdView = new headerView();
	var cntView = new contentView();
	var uploadV = new uploadVideo();
	searchResult = new youtubeSearchResult();
	
	rList = new resultList();
	token = new pageToken();
	kWord = new keyword();
	router = new AppRouter();
	Backbone.history.start();
	
	
});