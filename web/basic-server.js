var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var url = require('url');
var helpers = require('./http-helpers');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");



var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer( function(req,res) {
  console.log('Received ' + req.method + ' from ' + req.url);
  var path = url.parse(req.url).pathname;
  handler.handleRequest(req,res, path);
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
} 

