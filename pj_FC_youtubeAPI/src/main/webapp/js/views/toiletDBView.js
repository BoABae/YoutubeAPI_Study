var toiletDB_selectCity = Backbone.View.extend({

    template:_.template($('#toiletDB_selectCity').html()),

    render:function () {
        $(this.el).html(this.template());
        return this;
    },
    events: {
    	'click .home': 'home',
    	'click #search': 'search',
    },
    search: function(){
    	$("#list").empty();
		var xhr = new XMLHttpRequest();
		var urlSuwonToilet = 'http://api.suwon.go.kr/openapi-data/service/Toilet/getToilet';
		var urlBusanToilet = 'http://opendata.busan.go.kr/openapi/service/PublicToilet/getToiletInfoDetail';
		var urlJeonjuToilet = 'http://openapi.jeonju.go.kr/rest/toilet/getToiletList';
		var serviceKey = '?ServiceKey=HfwEAMtSxZUmV1Ss%2F1kub%2FJslKdS%2FvAHe7gJbhSm7aCBwdTjJI04gvHFqeH1DdojAaWWzyBXPCQOxXxTk2tK%2Fg%3D%3D';
		var queryParams1 = '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*검색건수*/
		queryParams1 += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
		queryParams1 += '&' + encodeURIComponent('startPage') + '=' + encodeURIComponent('1');/*페이지 번호*/
		

		xhr.open('GET', urlJeonjuToilet + serviceKey + queryParams1);
		
		
		xhr.onreadystatechange = function(){
			if(this.readyState == 4 ){
				var xml = this.responseText;
				xmlDoc = $.parseXML(xml),
				$xml = $(xmlDoc);
				var xmlData = $xml.find("list");
				//var content = "";
				$(xmlData).each(function(){
					dataSid = $(this).find("dataSid").text();
					dataTitle = $(this).find("dataTitle").text();
					toiletArea = $(this).find("toiletArea").text();
					content ="<li><a>" +"화장실: " + dataTitle + "&nbsp;" + "주소 :" + toiletArea +"</a></li>";
					$("#list").append(content).listview('refresh');
				});
				//$("#list").append(content).listview("refresh");
				
				$("#list li").on("click", function(){
					var index = $(this).index();
					var title = xmlDoc.getElementsByTagName('dataTitle')[index].childNodes[0];
					var openTime = xmlDoc.getElementsByTagName('openTime')[index].childNodes[0];
					var toiletArea = xmlDoc.getElementsByTagName('toiletArea')[index].childNodes[0];
					var lng = xmlDoc.getElementsByTagName('posx')[index].childNodes[0];
					var lat = xmlDoc.getElementsByTagName('posy')[index].childNodes[0];
					pData.set({lng: lng.nodeValue, lat : lat.nodeValue, dataTitle: title.nodeValue, openTime: openTime.nodeValue, toiletArea: toiletArea.nodeValue});
					app.navigate('toiletDB_detailInfo', true);
				});
			
				
			}
		}
		xhr.send('');
    },
    home: function(){
    	app.navigate('home', true);
    },
 
    
});


var toiletDB_detailInfo = Backbone.View.extend({
	//el: $("#mapContent"),

	events:{
		'click .back': 'back',
		'click #toiletDB_selectCity back': 'page1',
		'click .home': 'home',
	},
	back: function(){
		app.navigate('toiletDB_selectCity', true);
		
	},
	page1: function(){
		app.navigate('toiletDB_selectCity', true);
	},
	home: function(){
		app.navigate('home', true);
	},
	

    template:_.template($('#toiletDB_detailInfo').html()),

    render:function () {
        $(this.el).html(this.template());
    	setTimeout(this.mapRender, 220);
    	/*
    	var publicData = pData.toJSON();
    	
    	console.log(publicData.openTime);
    	*/
    	
    },
    mapRender: function(){
    	
    	var publicData = pData.toJSON();
    	var location = new daum.maps.LatLng(publicData.lat, publicData.lng);
    	var mapContainer = document.getElementById("map");
    	var mapOption = {
    			center : location, 
    			level : 3
    	};
    	var map = new daum.maps.Map(mapContainer, mapOption); 
    	var control = new daum.maps.ZoomControl();
		map.addControl(control, daum.maps.ControlPosition.TOPRIGHT); 
		var marker = new daum.maps.Marker({
			map: map,
			position: location
		});
		$(".title").append(publicData.dataTitle);
    	$("#toiletArea").append(publicData.toiletArea);
    	$("#openTime").append(publicData.openTime);
		
		console.log("map");
    	
    	
    }
});