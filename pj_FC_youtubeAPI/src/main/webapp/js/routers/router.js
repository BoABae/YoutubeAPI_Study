var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "mainContent_html",
		"searchResult_html" : "searchResult",
		"uploadVideo_html" : "uploadVideo"
	},
	initialize : function() {
		new home({
			template : "#home"
		});
	},
	mainContent_html : function() {
	},
	uploadVideo: function(){
		new uploadVideo();
	},
	searchResult: function(){
		new youtubeSearchResult();
	},

});