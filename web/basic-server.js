var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var url = require('url');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var CLIENT_ROOT_DIR = './public'

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer( function(req,res) {
  var path = url.parse(req.url).pathname;
  handler.handleRequest(req,res, CLIENT_ROOT_DIR + path + 'index.html');
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
} 

