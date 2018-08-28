require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
// var exphbs = require("express-handlebars");
var db = require("./models");

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));



// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");
// const socket = require("socket.io");

// var io = socket(server);

// Set socket.io listeners.
io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//Routes
const htmlRoute = require("./routes/htmlRoutes.js");
const apiRoute = require("./routes/apiRoutes.js")(io);
app.use("/", htmlRoute);
app.use("/api", apiRoute);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});




