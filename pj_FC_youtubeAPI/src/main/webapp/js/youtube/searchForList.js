var nextPageToken, prevPageToken;
var count_page=1;
var firstPage=true;
var type = $(this).attr('count_range');
 
$(document).ready(function()
{
       
    $('#searchbutton').click(function()
    {
        // Called automatically when JavaScript client library is loaded.
      // alert('i am clicked');
        gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
        });
 
});
 
 function onYouTubeApiLoad() 
        {    
	
	        
	        
	        $('#nextPageButton').click(function()
    	    {
    	       // alert('i am clicked');
    	        console.log(nextPageToken);
    	        searchYouTubeApi(nextPageToken);
    	        // e.preventDefault();
    	        var stat = $('#numberUpDown').text();
    	        var num = parseInt(stat,10);
    	        num++;
    	        console.log(num)
    	        $('#numberUpDown').text(num);
     	    });
    	    
	       
	        
	         $('#prevPageButton').click(function()
	        {
	           // alert('i am clicked');
	            console.log(prevPageToken);
	            searchYouTubeApi(prevPageToken);
	            // e.preventDefault();
	            var stat = $('#numberUpDown').text();
	            var num = parseInt(stat,10);
	            num--;$('#numberUpDown').text(num);
	            if(num<=0){
	            num =1;
	            }
	            console.log(num);
 	        });
            // See http://goo.gl/PdPA1 to get a key for your own applications.
            gapi.client.setApiKey('AIzaSyCTgS4i5yhYxHF6FbQ_DKSbyBPiALrkYpM');
            searchYouTubeApi();
            // pageList();
            
 
        }
 		
        function searchYouTubeApi(PageToken)
        {
             var searchText= $('#searchtext').val();
              $('#response').append("<div id=\"searching\"><b>Searching for "+searchText+"</b></div>");
              
            // Use the JavaScript client library to create a search.list() API
			// call to Youtube's "Search" resource
            var request = gapi.client.youtube.search.list(
            {
            part: 'snippet',
            q:searchText,
            maxResults:5,
            pageToken:PageToken
            });
            // $('#response').replaceWith("<div id=\"searching\"><b>Searching
			// for "+searchText+"</b></div>");
              
            // Send the request to the API server,
            // and invoke onSearchRepsonse() with the response.
            request.execute(onSearchResponse);
           // $('#response').append("<div id=\"page\"><button type=\"button\"
			// id=\"nextPageButton\">Next Page return from request execute
			// method is: "+nextPageToken+"</button></div>");
        }
        
   
        
        function onSearchResponse(response) 
        {
        	console.log(response);
            var responseString = JSON.stringify(response, '', 1);
            var resultCount = response.pageInfo.totalResults;
            	resultsPageCount = response.pageInfo.resultsPerPage;
                nextPageToken=response.nextPageToken;
                prevPageToken=response.prevPageToken;
              // document.getElementById('response').innerHTML +=
				// responseString;
                // $('#response').append("<div id=count><b>Found "+resultCount+"
				// Results.</b></div>");
            $('#count').replaceWith("<div id=count><b>동영상 검색 결과 총  "+resultCount+" 개</b></div>");
         	/* 페이징 */
            
/*
 * // var divTest = document.getElementById("paging").value; //
 * divTest.innerHTML = "<b><font color='red'>값이 바뀜</font></b>"; if(divTest !=
 * null && divTest != undefined){ // alert("Count = " + divTest); }
 */          
               	
            
            // $('#searching').append("<div id=length><b>Length
			// "+response.items.length+" </b></div>");
           
             
            for (var i=0; i<response.items.length;i++)
            {
            	
            	// store each JSON value in a variable
                var publishedAt=response.items[i].snippet.publishedAt;
                var channelId=response.items[i].snippet.channelId;
                var title=response.items[i].snippet.title;
                var description=response.items[i].snippet.description;
                var thumbnails_default=response.items[i].snippet.thumbnails.default.url;
                var thumbnails_medium=response.items[i].snippet.thumbnails.medium.url;
                var thumbnails_high=response.items[i].snippet.thumbnails.high.url;
                var channelTitle=response.items[i].snippet.channelTitle;
                var liveBroadcastContent=response.items[i].snippet.liveBroadcastContent;
                var videoID=response.items[i].id.videoId;
                
                var titles = title.substring(0,10)
                var res = publishedAt.substring(0,10)
                var descriptions = description.substring(0,12)
                console.log(channelId);
               if(firstPage===true)
               {
               // print the stored variables in a div element
            	   
            		myrow = mytable.insertRow();
	        		cell1 = myrow.insertCell();
	        		cell2 = myrow.insertCell();
	        		
	        		cell1.innerHTML = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoID+"'><source src='http://www.youtube.com/watch?v="+videoID+"'></video><img id=imgTD src=\""+thumbnails_default+"\"/></a>";
	        		cell2.innerHTML = "<b>"+title+"</b>"+"<br>"+channelTitle+"<br>"+res;
      	   
                }
                else
                {
                	drop();
                    for (var i=0; i<response.items.length;i++)
                    {
                    	
                    	// store each JSON value in a variable
                        var publishedAt=response.items[i].snippet.publishedAt;
                        var channelId=response.items[i].snippet.channelId;
                        var title=response.items[i].snippet.title;
                        var description=response.items[i].snippet.description;
                        var thumbnails_default=response.items[i].snippet.thumbnails.default.url;
                        var thumbnails_medium=response.items[i].snippet.thumbnails.medium.url;
                        var thumbnails_high=response.items[i].snippet.thumbnails.high.url;
                        var channelTitle=response.items[i].snippet.channelTitle;
                        var liveBroadcastContent=response.items[i].snippet.liveBroadcastContent;
                        var videoID=response.items[i].id.videoId;
                        
                        myrow = mytable.insertRow();
		        		cell1 = myrow.insertCell();
		        		cell2 = myrow.insertCell();
		        		
		        		cell1.innerHTML = "<a id=linktoVid1 href='http://www.youtube.com/watch?v="+videoID+"'><source src='http://www.youtube.com/watch?v="+videoID+"'></video><img id=imgTD src=\""+thumbnails_default+"\"/></a>";
		        		cell2.innerHTML = "<b>"+title+"</b>"+"<br>"+channelTitle+"<br>"+res;
		        		
                    }
                }
                function drop() {
            		length = mytable.rows.length;
            		for (i = 1; i < length; i++) {
            			mytable.deleteRow(1);
            		}
            	}
                
                
            }
             firstPage=false;
        }