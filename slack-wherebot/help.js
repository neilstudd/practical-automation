
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'ephemeral',
  username: 'Wherebot',
  text: 'Just type a room name, e.g. `/where is the dining room` - I\'ll give you directions.',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {

  console.log("REQUEST: " + payload.user_name + " (" + payload.channel_name + "): `/where " + payload.text + "`")
  
  let msg = _.defaults({
    channel: payload.channel_name
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /help/ig, handler: handler }
