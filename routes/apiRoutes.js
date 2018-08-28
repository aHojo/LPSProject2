var db = require("../models");
var express = require("express");
var router = express.Router();


router
  .post("/sendMessage", function(req, res) {
    var message = req.body

    console.log(message);
    res.json(message);
  })
  .post("/sms", function(req,res) {
    console.log(req.body);

    io.emit('call progress event', req.body);
    res.send('Event received');
  //   const twiml = new MessagingResponse();

  // twiml.message('The Robots are coming! Head for the hills!');

  // res.writeHead(200, {'Content-Type': 'text/xml'});
  // res.end(twiml.toString());
  });

module.exports = router;
