var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.CLIENT_ROOT_DIR = './web/public';
exports.ARCHIVE_ROOT_DIR = './archives';


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, statusCode, payLoad, headers) {
  console.log('>>>' + asset);
  fs.readFile(asset, 'utf8', function(err, data) {
    console.log(data);
    res.writeHead(statusCode, headers);
    res.write(data);
    res.end();
  });
  
};

exports.sendResponse = function(res, statusCode, payLoad, headers){
  res.writeHead(statusCode, headers);
  res.end(payLoad);
}

