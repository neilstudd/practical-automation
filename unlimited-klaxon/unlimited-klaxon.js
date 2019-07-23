var http = require('http');
var requestConfig = {
  url: 'https://www.cineworld.co.uk/q?live=1&json=1&q=unlimited&start=0&max=20'
};
var response = http.request(requestConfig);
var films = JSON.parse(response.body).feats;

var filmList = "";

// DEBUG: Nuke the list of known films.
// storage.local.knownScreenings = [];

// Check each film to see if we already know about it
for (index = 0; index < films.length; ++index) {
    filmName = films[index].n;
    if(storage.local.knownScreenings.indexOf(filmName) == -1)
    {  
        // Check if the film is in the future, because sometimes Cineworld pushes random olde films onto the stack?!
        var thisFilmDateTime = Date.parse(films[index].reldatef);
        var currentDateTime = Date.now();
        if (thisFilmDateTime > currentDateTime) {
	    	filmList += films[index].reldatef + ': ' + films[index].n + ' - https://www.cineworld.co.uk' + films[index].url + '<br/>';
        	storage.local.knownScreenings.push(films[index].n);
        }
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
