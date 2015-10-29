var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.CLIENT_ROOT_DIR = './public';

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, statusCode, payLoad, headers) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(asset, 'utf8', function(err, data) {
    res.writeHead(statusCode, headers);
    res.write(data);
    res.end();
  });
  
};

exports.sendResponse = function(res, statusCode, payLoad, headers){
  res.writeHead(statusCode, headers);
  res.end(payLoad);
}

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
