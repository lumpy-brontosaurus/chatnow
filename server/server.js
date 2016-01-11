var express = require('express');
var port = process.env.PORT || 3000;

var app = express();
app.use(express.static(__dirname +'/../client'));
app.use(express.static(__dirname +'/../node_modules'));

var server = app.listen(port, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("server running on port: ", port);
});