/* ------------------------------------------------------------------------------------ *\
    twitter-search-with-jquery.js
// ------------------------------------------------------------------------------------
 DESCRIPTION:
 
 		A script that tests using the Twitter API with jQuery and jSON
 		('successfully I might add' -- Sheldon Cooper)
 		
 ASSUMPTIONS:
 
	The script, in its current implementation, assumes that your web page:
	* has an input field whose id='twittersearch' 
		-- this is where the jQuery script gets its search terms.
	* has a container element whose id='countdown' 
		-- this is where the jQuery script posts the countdown to the next search
	* has a container element whose id='twitterresults' 
		-- this is where the jQuery script posts what it finds.
		
 DEPENDENCIES:
 		
		jquery.min.js (at minimum 1.3.2)

 SYNTAX:
 
       to test it locally, try:
       	file:///Users/<USERNAME>/<PATHOFFILES>/twitter-search-with-jquery/twitter-search-with-jquery.html

 TO DO:
 
		we got the script at the bottom of the page to insure the DOM is loaded, 
			-- let's make the $(document).ready approach work instead (incl. error handling)
       do we want to move this more into an HTML5 / <figure> approach?

 LICENSE:
 		twitter-search-with-jquery.html by Dean Peters is licensed under a 
		Creative Commons Attribution-NonCommercial-ShareAlike 3.0 
		United States License. For more details, read here:
		http://creativecommons.org/licenses/by-nc-sa/3.0/us/

 WARANTEE:
		absolutely none. use at your own peril

 KVETCH:
		got a comment, complaint, criticism or contribution?
		bit.ly/twitter-search-with-jquery 
		http://twitter.com/deanpeters
		http://healyourchurchwebsite.com
\* ------------------------------------------------------------------------------------ */



/*
 * bit.ly/twitter-search-with-jquery 
 */
 
/*
<h2 id="countdown">Seconds until the next refresh: <span>120</span></h2>

<!-- note 3 of 6, important! this is what defines the search value -->
<input type="hidden" id="twittersearch" value="social media" />


<!-- note 4 of 6, also important! you need this ID as a place for the script to put results -->
<div id="twitterresults">no results yet</div>
</div>

*/

 
/* a counter outside the context of setCountdown() */
var seconds2go = 0;

/* 
 * the method that sets the visual display of the countdown timer, 
 * and triggers getTweet after 2 minutes 
 *
 * currently ASSUMES you have a class/container on your page where the id='countdown' 
 */
var setCountdown = function() {
	seconds2go--;
	if(seconds2go > 0) {
		$("#countdown").html("Seconds until the next refresh: <span>" + seconds2go + "</span>");
	} else {
		$("#countdown").html("Seconds until the next refresh: <span>0</span>");
		getTweet();																// this is the callback
		seconds2go = 120;
	}
}

/* 
 * the method goes out to the Titter API, 
 * then parses the jSON block into the display 
 *
 * currently ASSUMES you have a class/container on your page where the id='twittersearch' 
 *		this is an input field on your page that defines the search terms
 * currently ASSUMES you ahve a class/container on your page where the id='twitterresults' 
 * 		this is a place where the jQuery script posts its search findings
 */
var getTweet = function() {

  /* set everything up */
  var url="http://search.twitter.com/search.json?rpp=5&callback=?&q=";
  var query = escape( query=$("#twittersearch").val() );						// looks for input field id='twittersearch'
  var display = '<div class="tweetDisplayContainer error">no records found</div>';
  var urirex = /(https?):\/\/+([\w\d:#@%\/;$()~_?\+-=\\\.&]*)/g;				// url regex
  var hashrex = /\#+([\w\d:#@%/;$()~_?\+-=\\\.&]*)/g;							// hash tag regex
  var thashuri = "http://search.twitter.com/search?q=%23";						// search uri regex
  $("#twitterresults").html('');												// looks for <div id='twitterresults'>

    /* go get the data, then parse it */
    $.getJSON(url+query,function(json){
	$("#twitterresults").html('<h4><a class="searchlink" href="' + url.replace('search\.json','search')+query + 
		'" title="see the search query via Twitter">Testing: ' + url+query + '</a></h4>');
	if(json) {
		display = '<div class="tweetsContainer"><dl class="tweets clearfix">';
		$.each(json.results,function(i,tweet){
			ttext = tweet.text.replace(urirex, '<a href="$1://$2" title="">$2</a>');				// change the uri
			ttext = ttext.replace(hashrex, '<a href="' + thashuri  + '$1" title="">#$1</a>');		// link up hashtag
			display +=	'<dt class="tweet' + i + '">' +
						'<img src="' + tweet.profile_image_url + '"  />' + 
					'</dt>' +
					'<dd class="tweet' + i + '">' +
						ttext + ' <strong>via:</strong>' +
						'<a href="http://twitter.com/' + tweet.from_user + 
						'" title="tweets by ' + tweet.from_user + 
						'">@' + tweet.from_user + '</a>' 
					'</dd>';
	      	});
		display += '</dl></div>';
	}
        $("#twitterresults").append(display);

    });
}

/* this is where we kick-it all off, assumes seconds2go = 0 initially  */
setInterval(setCountdown, 1000);		