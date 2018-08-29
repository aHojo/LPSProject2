var db = require("../models");
var express = require("express");
var router = express.Router();
const twilio = require('twilio');

var returnRouter = function(io){
  router
    .post("/sendMessage", function(req, res) {
      var message = req.body
      var name = req.body.name;
      console.log(name);
      console.log(message);
      res.json(message);
    })
    .post("/sms", function(req,res) {
      console.log(req.body);
      var messageBody = req.body.Body;
      var from = req.body.From;
      console.log(messageBody);
      io.emit('text', {messageBody, from});
      res.send('Event received');
    //   const twiml = new MessagingResponse();

    // twiml.message('The Robots are coming! Head for the hills!');

    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
    });

    return router;
}
module.exports = returnRouter;
