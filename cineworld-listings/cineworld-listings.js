var http = require('http');

// ------------------------------------------------------------------
//  Customise the following to control which cinema you're watching,
//  and who gets the alert!
// ------------------------------------------------------------------
var cinemaId = 8071;
var resetStartDate = false; // Set this to 'true' to reset start date
var emailRecipient = "your-email-address@example.org";
var emailSubject = "Next week's Milton Keynes listings available!";
// ------------------------------------------------------------------

if(resetStartDate || !storage.local.lastSuccess)
    {       
        storage.local.lastSuccess = getNextFriday();
        storage.local.lastWeeksFilms = [];
    }

var targetDate = new Date(storage.local.lastSuccess);
var startDateFormatted = targetDate.toISOString().substring(0,10);
console.log("Checking whether films have been announced for " + targetDate + "...");

// Only proceed if films have been announced
if(hasListings(cinemaId, startDateFormatted))
    {
        var filmList = [];
        dateToCheck = startDateFormatted;
        
        // Go through the seven days of listings, building list of films.
        for(day=1;day<=7;day++)
            {
                addFilmsToList(cinemaId, dateToCheck);               
                currentDate = new Date(dateToCheck);
                dateToCheck = new Date(currentDate.setDate(currentDate.getDate() + 1)).toISOString().substring(0,10);
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
                if (storage.local.lastWeeksFilms.indexOf(uniqueFilms[i]) == -1)
                    {
                     emailFilmList += '[NEW] ';   
                    }
    			emailFilmList += uniqueFilms[i] + '<br/>';
  			}      
        
		var mailBody = "<b>Here are all of the films for the week of " + targetDate + ", check website for date/times!</b><br/><br/>" + emailFilmList;   		
        var emailConfig = {
  			"to": emailRecipient,
  			"fromName": "Cineworld Alerts",
  			"subject": emailSubject,
  			"body": mailBody
   		};
        
        // Store this week's films for cross-comparison next week
        storage.local.lastWeeksFilms = uniqueFilms;

        // Work out start date for next week
        storage.local.lastSuccess = currentDate;
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
           filmList.push(films[i].name);
       }
}

// Consider that a date has listings if there are more than 4 films showing 
// (as there might already be a couple announced for preorders or special events)
function hasListings(cinemaId, dateToCheck) {
    films = getFilms(cinemaId, dateToCheck); 
    return films.length > 4;
}

// Helper for retrieving film listings
function getFilms(cinemaId, dateToCheck) {
    var requestConfig = {
  		url: 'https://www.cineworld.co.uk/uk/data-api-service/v1/quickbook/10108/film-events/in-cinema/' + cinemaId + '/at-date/' + dateToCheck
    };
	var response = http.request(requestConfig);
    return JSON.parse(response.body).body.films;   
}

// Work out next Friday, for reset purposes
function getNextFriday() {        
	var date = new Date();
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (12 - date.getDay()) % 7);
    resultDate.setHours(5,0,0,0); // 5am next Friday
    return resultDate;    
}
