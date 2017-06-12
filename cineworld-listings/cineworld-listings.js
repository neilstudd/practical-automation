var http = require('http');

var MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

// ------------------------------------------------------------------
//  Customise the following to control which cinema you're watching,
//  and who gets the alert!
// ------------------------------------------------------------------
var cinemaId = 1010861;
var emailRecipient = "your-email-address@example.org";
var emailSubject = "Next week's Milton Keynes listings available!";
var resetStartDate = false; // Set this to 'true' if you ever need to reset start date
// ------------------------------------------------------------------

if(resetStartDate || !storage.local.lastSuccess)
    {       
        storage.local.lastSuccess = getNextFriday();
    }

var targetDate = new Date(storage.local.lastSuccess);
var startDateInMs = targetDate.getTime();

console.log("Checking whether films have been announced for " + targetDate + "...");

// Only proceed if films have been announced
if(hasListings(cinemaId, startDateInMs))
    {
        var filmList = [];
        dateToCheck = startDateInMs;
        
        // Go through the seven days of listings, building list of films.
        for(day=1;day<=7;day++)
            {
                addFilmsToList(cinemaId, dateToCheck);
                dateToCheck+=MILLISECONDS_IN_ONE_DAY;
            }
        
        // Dedupe and sort the film list
        uniqueFilms = filmList.filter(function(item, pos) {
  			  return filmList.indexOf(item) == pos;
		})       
        uniqueFilms.sort();
        
        // Convert list to HTML
        var emailFilmList = "";        
        for(i=0; i<uniqueFilms.length; i++)
  			{
    			emailFilmList += uniqueFilms[i] + '<br/>';
  			}      
        
		var mailBody = "<b>Here are all of next week's films, check website for date/times!</b><br/><br/>" + emailFilmList;   		
        var emailConfig = {
  			"to": emailRecipient,
  			"fromName": "Cineworld Alerts",
  			"subject": emailSubject,
  			"body": mailBody
   		};
        
        var date = new Date(startDateInMs);
        storage.local.lastSuccess = date.setDate(date.getDate() + 7);
        var targetDate = new Date(storage.local.lastSuccess);
		console.log("Mail sent, now awaiting announcements for " + targetDate);
        
		return sendMail(emailConfig.to, emailConfig.fromName, emailConfig.subject, emailConfig.body);   
    }
else
    {
        var targetDate = new Date(storage.local.lastSuccess);
        return "Still awaiting announcements for " + targetDate;
    }

// Add the chosen day's films to the list of films
function addFilmsToList(cinemaId, dateToCheck) {
    films = getFilms(cinemaId, dateToCheck);
    for(i=0; i<films.length; i++)
       {
           filmList.push(films[i].n);
       }
}

// Consider that a date has listings if there are more than 3 films showing 
// (as there might already be a couple announced for preorders or special events)
function hasListings(cinemaId, dateToCheck) {
    films = getFilms(cinemaId, dateToCheck); 
    return films.length > 3;
}

// Helper for retrieving film listings
function getFilms(cinemaId, dateToCheck) {
    var requestConfig = {
  		url: 'https://www.cineworld.co.uk/pgm-site?si=' + cinemaId + '&max=365&bd=' + dateToCheck + '&attrs=2D%2C3D%2CIMAX%2CViP%2CVIP%2CDBOX%2C4DX%2CM4J%2CSS'
	};
	var response = http.request(requestConfig);
    return JSON.parse(response.body);   
}

// Work out next Friday, for reset purposes
function getNextFriday() {        
	var date = new Date();
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (12 - date.getDay()) % 7);
    resultDate.setHours(5,0,0,0); // 5am next Friday
    return resultDate;    
}
