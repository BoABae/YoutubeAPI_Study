var keyword = Backbone.Model.extend({
	defaults: {
		keyword: '',
	}
});

var resultList = Backbone.Model.extend({
	defaults: {
		videoId : '',
		title: '',
		thumbnails_default: '',
	},
	
});
var pageToken = Backbone.Model.extend({
	defaults: {
		nextPageToken: '',
		prevPageToken: '',
	}
});