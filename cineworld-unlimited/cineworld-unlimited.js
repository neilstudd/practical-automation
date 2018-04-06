var http = require('http');
var requestConfig = {
  url: 'https://www.cineworld.co.uk/uk/data-api-service/v1/quickbook/10108/films/until/2019-04-06?attr=&lang=en_GB'
};
var response = http.request(requestConfig);

filmList = "";
films = JSON.parse(response.body).body.films;

// DEBUG: Nuke the list of known films.
// storage.local.knownScreenings = [];

// Loop through films and see if any are unknown unlimited screenings
for(i=0; i<films.length; i++)
  {
    filmName=films[i].name;
    if(filmName.indexOf('Unlimited') > -1 && storage.local.knownScreenings.indexOf(filmName) == -1)
      {
       filmList += filmName + ' - https://www.cineworld.co.uk' + films[i].link + '<br/>';
       storage.local.knownScreenings.push(filmName);
      }
  }

// If any unlimited screenings were found, send email
if (filmList != "")
  {
   var mailBody = "<b>New Unlimited screening detected!</b><br/><br/>" + filmList;
   var emailConfig = {
  	"to": "your-email-address@example.org",
  	"fromName": "Cineworld Alerts",
  	"subject": "New Unlimited screening detected!",
  	"body": mailBody
   	};
	return sendMail(emailConfig.to, emailConfig.fromName, emailConfig.subject, emailConfig.body); 
  }
else
    {
        return "No new unlimited screenings found. Current known screenings: " + storage.local.knownScreenings.toString();
    }

