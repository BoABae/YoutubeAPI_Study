var myVideoListView = Backbone.View.extend({
	el: $("#content"),
	initialize: function(){
		this.render();
	},
	render: function(){
		var template = _.template($("#myVideoList_html").html(), {});
		this.$el.html(template);
	},
	//내가올린 동영상 목록 가져오는 함수
	playList: function(){
		var self = this;
		var request = gapi.client.youtube.playlistItems.list({
			part: 'snippet, contentDetails',
			id: 'suhamia21',
		});
		request.execute(function(response){
			console.log(response.result);
			
		});
		
	},
});