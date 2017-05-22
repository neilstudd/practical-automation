var http = require('http');

// ------------------------------------------------------------------
//  Customise the following to control which cinema you're watching,
//  and who gets the alert!
// ------------------------------------------------------------------
var cinemaId = 1010861;
var resetStartDate = false; // Set this to 'true' to change start date
var emailRecipient = "scriptr@neilstudd.com";
var emailSubject = "Next week's Milton Keynes listings available!";
// ------------------------------------------------------------------

if(resetStartDate)
    {       
        storage.local.lastSuccess = "Sat May 06 2017 07:00:00 GMT-0000";
    }

var targetDate = new Date(storage.local.lastSuccess);
console.log("Checking whether films have been announced for " + targetDate + "...");

var dateInMs = new Date(storage.local.lastSuccess).getTime();

var requestConfig = {
  url: 'https://www.cineworld.co.uk/pgm-site?si=' + cinemaId + '&max=365&bd=' + dateInMs + '&attrs=2D%2C3D%2CIMAX%2CViP%2CVIP%2CDBOX%2C4DX%2CM4J%2CSS'
};
var response = http.request(requestConfig);

filmList = "";
films = JSON.parse(response.body);

// Assume we need more than three films for a full day's programme
// (as there might already be a couple announced for preorders or special events)
if(films.length>3)
    {
        // Compile film list and send email
        for(i=0; i<films.length; i++)
  			{
    			filmList +=films[i].n + '<br/>';
  			}
        
			var mailBody = "<b>New listings found for " + targetDate + ":</b><br/><br/>" + filmList;   		
        var emailConfig = {
  			"to": emailRecipient,
  			"fromName": "Cineworld Alerts",
  			"subject": emailSubject,
  			"body": mailBody
   		};
        
        var date = new Date(dateInMs);
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