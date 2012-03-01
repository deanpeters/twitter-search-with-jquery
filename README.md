Introduction
============

## Fun with the Twitter Search API and jQuery ##

I admit, I'm an API junkie. Who else in their spare time rips open a SOAP, XML-RPC, RSS &/or web 
service just for fun on a Saturday night? I know, I need help.

That said, twitter-search-with-jquery.js was written on such a night as I was curious about the 
Twitter Search API ... and how I might rip into its jSON returned via Twitter's REST-ful API.

I think blogged about my findings here:

* http://tinyurl.com/jquery-fun-with-twitter-api

## Installation ##

### Short Story ###

In theory, you should be able to run the test file out-of-the-box with the following URL in your browser:

* file:///{CHANGE-THIS-PATH-TO-MATCH-YOUR-FILESYSTEM}/twitter-search-with-jquery/twitter-search-with-jquery.html

... of course you'll need to change the path names to match yours.

### Somewhat Longer Version ###

Copy twitter-search-with-jquery.js to a path your web pages can reach.

Here's a syntax that might work for you, let's say for example adding it to a WordPress theme:

     cd ~/mydomain.com/wp-content/themes/classic
     wget https://github.com/deanpeters/wget twitter-search-with-jquery/blob/master/wget twitter-search-with-jquery.js
     wget https://github.com/deanpeters/wget twitter-search-with-jquery/blob/master/wget twitter-search-with-jquery.css

The script, in its current implementation, assumes that your web page:
* has an input field whose id='twittersearch' -- this is where the jQuery script gets its search terms.
* has a container element whose id='countdown' -- this is where the jQuery script posts the countdown to the next search
* has a container element whose id='twitterresults' -- this is where the jQuery script posts what it finds.

Below is an example snip of the bare minimum to get things rolling:
<pre>
	&lt;html&gt;
	&lt;head&gt;
		...
		&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"&gt;&lt;/script&gt;
		&lt;link href="twitter-search-with-jquery.css" media="screen" rel="stylesheet" type="text/css" /&gt;
		...
	&lt;/head&gt;
	&lt;body&gt;
		...
		&lt;h2 id="countdown"&gt;Seconds until the next refresh: &lt;span&gt;120&lt;/span&gt;&lt;/h2&gt;
		&lt;input type="hidden" id="twittersearch" value="social media" /&gt;
		&lt;div id="twitterresults"&gt;no results yet&lt;/div&gt;
		...
		&lt;script src="twitter-search-with-jquery.js" type="text/javascript"&gt;&lt;/script&gt;
	&lt;/body&gt;
	&lt;/html&gt;
</pre>

Your mileage may vary

## Observations ## 

The API was relatively easy to call. What was a bit of a bear was the fact that not all URLs and 
certainly not all #HashTags are created equal. Meaning, it took quiet a few data pulls from a 
broad range to come up with the follwing regular expressions that allowed us to identify, extract,
and then leverage URLs and #HashTags in tweets:

<pre>
  var urirex = /(https?):\/\/+([\w\d:#@%\/;$()~_?\+-=\\\.&]*)/g;				// url regex
  var hashrex = /\#+([\w\d:#@%/;$()~_?\+-=\\\.&]*)/g;							// hash tag regex
</pre>

Everything else was relatively straight-forward.

## To-Do ##

Wow, where do I begin? This list could be so long because I wrote up this script in a single night, but for starters:

* convert code into a standard jQuery module, there's not much left to do in that realm, so do this first
* the image twitter-search-background.gif is a liar, there is no search/form display, so do this second
* we got the script at the bottom of the page to insure the DOM is loaded, let's make the $(document).ready approach the third fix
* ad a field to define the duration of the search so it's not hard-coded into the page or script
* allow users to define the id of the container that is currently hard-coded id='countdown'
* allow users to define the id of the input field that is currently hard-coded id='twittersearch'
* allow users to define the id of the container that is currently hard-coded id='twitterresults'
* think about perhaps getting away from a form/input fields altogether, so there's an init method called first
* see what can be done with regards to catching-n-throwing errors returned
* prevent users from getting a 'timeout' due to countdown durations that are too short
* do we need to convert the output into an HTML5 figure, or at least offer the option?

