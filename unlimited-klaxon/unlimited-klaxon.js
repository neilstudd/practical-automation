var http = require('http');
var requestConfig = {
  url: 'https://www.cineworld.co.uk/q?live=1&q=unlimited'
};
var response = http.request(requestConfig);
var responseHtml =(response.body);
var filmList = "";

// DEBUG: Nuke the list of known films.
// storage.local.knownScreenings = [];

// Response HTML structured as follows:
// <li><a href="/films/unsane-unlimited-screening">Unsane: Unlimited Screening</a></li>
// ...get the link URL and link text out of it
var matches = [];
responseHtml.replace(/[^<]*(<a href="([^"]+)">([^<]+)<\/a>)/g, function () {
    matches.push(Array.prototype.slice.call(arguments, 1, 4))
});

// Check each film to see if we already know about it
for (index = 0; index < matches.length; ++index) {
    filmName = matches[index][2];
    if(storage.local.knownScreenings.indexOf(filmName) == -1)
    {
	    filmList += matches[index][2] + ' - https://www.cineworld.co.uk' + matches[index][1] + '<br/>';
        storage.local.knownScreenings.push(matches[index][2]);
    }    
}

// If any unlimited screenings were found, send email
if (filmList != "")
  {
   var mailBody = "<b>Tickets might not be on sale yet, but you might like to know!</b><br/><br/>" + filmList;
   var emailConfig = {
  	"to": "your-email-address@example.org",
  	"fromName": "Cineworld Alerts",
  	"subject": "UNLIMITED KLAXON",
  	"body": mailBody
   	};
	return sendMail(emailConfig.to, emailConfig.fromName, emailConfig.subject, emailConfig.body); 
  }
else
    {
        return "No new unlimited screenings found. Current known screenings: " + storage.local.knownScreenings.toString();
    }

