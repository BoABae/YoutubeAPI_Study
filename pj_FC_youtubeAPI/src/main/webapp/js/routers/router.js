var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "mainContent_html",
		"uploadVideo_html" : "uploadVideo",
		"searchResult_html" : "searchResult_html",
		"uploadVideo_html": "upLoadVideo",
		"myVideoList_html": "myVideoList",
	},
	initialize : function() {
		
	},
	mainContent_html : function() {
		this.changePage(cntView);
	},
	
	searchResult_html: function(){
		this.changePage(searchResult);
		onLoadAuth(searchResult.search());
	},
	upLoadVideo: function(){
		this.changePage(uploadV);
		onLoadAuth(uploadV.upLoad());
	},
	myVideoList: function(){
		this.changePage(myVideo);
		onLoadAuth(myVideo.playList());
	},
	changePage: function(page){
		page.render();
	}
});