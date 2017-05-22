
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'ephemeral',
  username: 'Wherebot',
  icon_emoji: config('ICON_EMOJI')
}

const groundFloorImage = [{
      title: "Ground floor map",
      image_url: "http://example.org/ground-floor.png"
    }]

const firstFloorImage = [{
      title: "First floor map",
      image_url: "http://example.org/first-floor.png"
    }]

const secondFloorImage = [{
      title: "Second floor map",
      image_url: "http://example.org/second-floor.png"
    }]

const pixies = [{
      title: "[YouTube] The Pixies - Where Is My Mind",
      title_link: "https://www.youtube.com/watch?v=yFAnn2j4iB0"
    }]

const blackEyedPeas = [{
      title: "[YouTube] The Black Eyed Peas - Where Is The Love?",
      title_link: "https://www.youtube.com/watch?v=WpYeekQkAdc"
    }]

const fire = [{
      title: "FIRE",
      image_url: "http://i.giphy.com/KFpnEok68LhHa.gif"
    }]

const handler = (payload, res) => {

  var responseText
  var attachment = null

  var requestText = payload.text.toLowerCase()

  // remove "is" or "the"
  if (requestText.slice(0,3)=="is ") requestText = requestText.substring(3)
  if (requestText.slice(0,4)=="the ") requestText = requestText.substring(4)

  // remove last character if it's a question mark
  if (requestText.slice(-1)=="?") requestText = requestText.substring(0,requestText.length-1)

  // see who wants the toilet
  if (requestText.includes('toilet'))
  {
    responseText = "There are toilets on every floor. If you've got time to ask, you don't need to go yet."
  }
  else if (requestText.includes(' team'))
  {
    responseText = "I'm not trained to know where teams live. (Yet.)"
  }
  else if (requestText.includes('conferenc'))
  {
    responseText = "The best room for video conferencing is The Great Hall on the first floor"
    attachment = firstFloorImage
  }
  else
  {
    switch(requestText) {
    case 'ballroom':
    case 'ball room':
      responseText = "The Ballroom is on the ground floor, opposite the kitchen."
      attachment = groundFloorImage
      break;
    case 'drawing room':
	case 'drawing':
	  responseText = "The Drawing Room is on the first floor, far left hand side."
      attachment = firstFloorImage
      break;
    case 'dining room':
    case 'dining':
      responseText = "The Dining Room is on the second floor, far left hand side."
      attachment = secondFloorImage
      break;
    case 'lounge':
    case 'games room':
    case 'playstation':
      responseText = "The Lounge is on the first floor, by the stairs. It's full of games and comfy chairs." 
      attachment = firstFloorImage   
      break;      
    case 'study':
      responseText = "There isn't a meeting room called The Study any more!"
      break;  
    case 'fire':
      responseText = "If you think the building might be on fire, I recommend leaving. Proceed to your designated meeting point."
      attachment = fire    
      break;    
    case 'my mind':
      responseText = "WITH YOUR FEET ON THE AIR AND YOUR HEAD ON THE GROUND"
      attachment = pixies           
      break;
    case 'love':
      responseText = "Here is the love. :heart:"
      attachment = blackEyedPeas           
      break;
    default:
      responseText =  "I don't know which room that is... If you think that I should, ask @neilstudd to train me."  
    }
  }

  console.log("REQUEST: " + payload.user_name + " (" + payload.channel_name + "): `/where " + payload.text + "`")

  let msg = _.defaults({
    channel: payload.channel_name,
    text: responseText,
    attachments: attachment
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /^((?!help).)/ig, handler: handler }
