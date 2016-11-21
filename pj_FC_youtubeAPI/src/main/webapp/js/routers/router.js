var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "mainContent_html",
		"uploadVideo_html" : "uploadVideo",
		"searchResult_html" : "searchResult_html",
	},
	initialize : function() {
		
	},
	mainContent_html : function() {
		new contentView();
	},
	
	searchResult_html: function(){
		this.changePage(searchResult);
	},
	changePage: function(page){
		page.render();
	}
});