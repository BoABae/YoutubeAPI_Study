var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "home",
		"home" : 'home',
		"toiletDB_selectCity" : "toiletDB_selectCity",
		"toiletDB_detailInfo" : "toiletDB_detailInfo",
	},
	initialize : function() {
		new home({
			template : "#home"
		});
	},
	home : function() {
		this.changePage(new home());
	},

	toiletDB_selectCity : function() {
		$("#list").remove();
		this.changePage(new toiletDB_selectCity());
	},

	toiletDB_detailInfo : function() {
		$("#map").remove();
		$(".title").remove();
		$("#toiletArea").remove();
		$("#openTime").remove();
		this.changePage(new toiletDB_detailInfo());
		
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