var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "mainContent_html",
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
	
	changePage : function(page) {
		$(page.el).attr('data-role', 'page');
		page.render();
		$('body').append($(page.el));
		$.mobile.defaultPageTransition = 'none';
		$.mobile.changePage($(page.el), {
			changeHash : false,
		});
		
	},

});