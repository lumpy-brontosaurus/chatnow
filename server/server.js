var express = require('express');
var io = require('socket.io');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();
//
app.use(express.static(__dirname +'/../client'));

var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("server running on port: ", port);
});
//
io = io.listen(server);
require('./sockets/base')(io);
//require('./config/users.js');

// set up our JSON API for later
//require('./config/api')(app);

app.set('view engine', 'ejs');

// middleware settings
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
require('./config/routes.js')(app);

// for dev
app.use(express.static(__dirname +'/../client'));


/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;