var nextPageToken, prevPageToken;
var count_page=1;
var firstPage=true;
var type = $(this).attr('count_range');


$(document).ready(function()
{
       
    $('#search').click(function()
    {
        // Called automatically when JavaScript client library is loaded.
      // alert('i am clicked');
        gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
        });
 
});


function onYouTubeApiLoad(){

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
	
	
	
	gapi.client.setApiKey('AIzaSyCTgS4i5yhYxHF6FbQ_DKSbyBPiALrkYpM');
	searchYouTubeApi();
}

function searchYouTubeApi(PageToken){
	var sKeyword = $("#searchKeyword").val();
	
	var request = gapi.client.youtube.search.list(
            {
            part: 'snippet',
            q:sKeyword,
            maxResults:5,
            pageToken: PageToken,
            });
	console.log(request);
	request.execute(onSearchResponse);

}
function onSearchResponse(response){
	var responseString = JSON.stringify(response, '', 2);
	console.log(response.items.length);
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






