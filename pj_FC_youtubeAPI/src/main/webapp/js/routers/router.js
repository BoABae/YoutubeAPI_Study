var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "mainContent_html",
		"uploadVideo_html" : "uploadVideo",
		"searchResult_html" : "searchResult",
		"myUploadVideoList_html": "myUpLoadVideo",
		"myLikedVideoList_html": "mylikedVideoList",
		"uploadVideo_html": "uploadVideo",
	},
	initialize : function() {
	},
	mainContent_html : function() {
		this.changePage(cntView);
		cntView.activities();
	},
	searchResult: function(){
		this.changePage(searchResult);
	},
	myUpLoadVideo: function(){
		this.changePage(myUploadVideo);
		onLoadAuth(myUploadVideo.myUploadVideoList());
	},
	mylikedVideoList: function(){
		this.changePage(myVideo);
		onLoadAuth(myVideo.playList());
	},
	uploadVideo: function(){
		this.changePage(uploadV);
		onLoadAuth(uploadV.videoUploadReady());
	},
	changePage: function(page){
		page.render();
	}
});