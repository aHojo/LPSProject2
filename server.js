require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
// var exphbs = require("express-handlebars");
var db = require("./models");

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;

//Route Files
var htmlRoute = require("./routes/htmlRoutes.js");
var apiRoute = require("./routes/apiRoutes.js")(io);

// Middleware
app.disable('etag');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//Routes
app.use("/", htmlRoute);
app.use("/api", apiRoute);

app.use(express.static("public"));

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});




