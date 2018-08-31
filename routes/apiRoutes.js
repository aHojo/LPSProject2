var db = require("../models");
var express = require("express");
var router = express.Router();
var twilio = require('twilio');

var returnRouter = function(io){
  router

    .get('/sendMessage', function(req, res) {
      // var message = req.body
      // var name = req.body.name;
      // console.log(name);
      // console.log(message);
      // res.json(message);

      db.Numbers.findAll({}).then(function(results) {
        res.json(results);
      })
    })

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
