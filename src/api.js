const express = require("express");
const serverless = require("serverless-http");
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();
const router = express.Router();
const axios = require('axios');

router.get("/res", (req, res) => {

  const response = new VoiceResponse();
  response.say('You entered '+req.body.Digits);
  res.type('text/xml');
  res.send(response.toString());

});

router.get('/voice',(req,res) => {
  const response = new VoiceResponse();
  const gather = response.gather({
      action: '/res',
      method: 'GET',
  });
  gather.say('Please enter your account number,\nfollowed by the pound sign');
  response.say('We didn\'t receive any input. Goodbye!');
  res.type('text/xml');
  res.send(response.toString());
  console.log(response.toString());


})
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
