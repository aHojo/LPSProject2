var db = require("../models");
var express = require("express");
var router = express.Router();
var twilio = require('twilio');

var accountSid = 'AC701b81ac82857abb47cb64196a781f13'; // Your Account SID from www.twilio.com/console
var authToken = '203d5a6fe857f621be2761c7d08ff3a5';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);


var returnRouter = function(io){
  router
    .get('/sendMessage', function(req, res) {
      var message = req.body.message
      var name = req.body.name;
      console.log(name);
      console.log(message);
      res.json(message);

    })
    .get("/contacts", function(req, res) {
		db.Numbers.findAll({}).then(function(results) {
			res.json(results);
		  })
		
    })
    .post("/sendMessage", function(req, res) {
      var message = req.body.message
      var name = req.body.name;
      console.log(message)
      client.messages.create({
        body: message,
        to: '+12672437849',  // Text this number
        from: '+18562493134' // From a valid Twilio number
    })
    .then(function (data) {
      
      console.log(data);
      res.json(data);
    });
      
    })
    .post("/sms", function(req,res) {
      console.log(req.body);
      var messageBody = req.body.Body;
      var from = req.body.From;
      console.log(messageBody);
      io.emit('text', {messageBody, from});
      res.send('Event received');
    })
    .post("/storeNumber", function(req, res) {
      var personName = req.body.name;
      var personNumber = req.body.number;
      console.log(req.body);
      
      db.Numbers.create({
        name: personName,
        number: personNumber
      }).then(function(dbNumbers) {
        // We have access to the new Numbers as an argument inside of the callback function
        res.json(dbNumbers);
      });
    });
    return router;
}

module.exports = returnRouter;
