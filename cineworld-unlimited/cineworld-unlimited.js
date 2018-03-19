var http = require('http');
var requestConfig = {
  url: 'https://www.cineworld.co.uk/pgm-feats?si=0&ft=1&vt=0&cin=0&udays=14&pi=0&sort=-&fsort=-&filter=&attrs=2D%2C3D%2CIMAX%2CViP%2CVIP%2CDBOX%2C4DX%2CM4J%2CSS'
};
var response = http.request(requestConfig);

filmList = "";
films = JSON.parse(response.body);

// DEBUG: Nuke the list of known films.
// storage.local.knownScreenings = [];

// Loop through films and see if any are unknown unlimited screenings
for(i=0; i<films.length; i++)
  {
    filmName=films[i].n;
    if(filmName.indexOf('Unlimited') > -1 && storage.local.knownScreenings.indexOf(filmName) == -1)
      {
       filmList += films[i].n + ' - https://www.cineworld.co.uk' + films[i].url + '<br/>';
       storage.local.knownScreenings.push(films[i].n);
      }
  }

// If any unlimited screenings were found, send email
if (filmList != "")
  {
   var mailBody = "<b>New Unlimited screening tickets on sale!</b><br/><br/>" + filmList;
   var emailConfig = {
  	"to": "your-email-address@example.org",
  	"fromName": "Cineworld Alerts",
  	"subject": "New Unlimited screening tickets on sale!",
  	"body": mailBody
   	};
	return sendMail(emailConfig.to, emailConfig.fromName, emailConfig.subject, emailConfig.body); 
  }
else
    {
        return "No new unlimited screenings found. Current known screenings: " + storage.local.knownScreenings.toString();
    }