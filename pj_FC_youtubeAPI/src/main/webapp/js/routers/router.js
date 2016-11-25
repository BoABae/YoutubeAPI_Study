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
	},
	upLoadVideo: function(){
		this.changePage(uploadV);
	},
	myVideoList: function(){
		this.changePage(myVideo);
	},
	changePage: function(page){
		page.render();
	}
});