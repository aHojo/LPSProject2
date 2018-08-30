var db = require("../models");
var express = require("express");
var router = express.Router();
var twilio = require('twilio');

var returnRouter = function (io) {
	router
		.post("/sendMessage", function (req, res) {
			var message = req.body
			var name = req.body.name;
			console.log(name);
			console.log(message);
			res.json(message);
		})
		.post("/sms", function (req, res) {
			console.log(req.body);
			var messageBody = req.body.Body;
			var from = req.body.From;
			console.log(messageBody);
			io.emit('text', { messageBody, from });
			res.send('Event received');
		});

	return router;
}
module.exports = returnRouter;
