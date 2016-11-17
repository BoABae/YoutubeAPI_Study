var headerView = Backbone.View.extend({
	el:$("#header"),
	
	//template:_.template($('#header_html').html()),
	initialize: function(){
		
		this.render();
	},
	render : function() {
		var template = _.template($("#header_html").html(), {});
		this.$el.html(template);
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
var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "mainContent_html",
		"uploadVideo_html" : "uploadVideo",
		"searchResult_html" : "searchResult",
	},
	initialize : function() {
		
	},
	mainContent_html : function() {
		new contentView();
	},
	uploadVideo: function(){
		new uploadVideo();
	},
	searchResult: function(){
		new youtubeSearchResult();
	},

});
var hdView = new headerView();
var cntView = new contentView();
var uploadV = new uploadVideo();


var router = new AppRouter();
Backbone.history.start();