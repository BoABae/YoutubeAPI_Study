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
		'click ': 'loadvideo'
	},
	loadvideo: function(){
		router.navigate('uploadVideo_html', true);
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
		"uploadVideo_html" : "uploadVideo"
	},
	initialize : function() {
		
	},
	mainContent_html : function() {
		new contentView();
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
var hdView = new headerView();
var cntView = new contentView();
var uploadV = new uploadVideo();


var router = new AppRouter();
Backbone.history.start();