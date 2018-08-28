var db = require("../models");
var path = require("path");
var express = require("express");
var router = express.Router();

router.get("/messaging", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/landingpage.html"));
});

module.exports = router;
