var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var types = [
  { regex: /css/, header: 'Content-Type: styles/css'},
  { regex: /ico/, header: 'Content-Type: image/vnd.microsoft.icon'}
];
var actions = {
  'GET' : function(res, path) {
    // index.html or loading.html
    if ( path === '/index.html' || path === '/loading.html' ) {
      helpers.serveAssets(res, path);
      helpers.sendResponse(res, 200, '', headers);
    }
    // archives
  },
  'POST' : function(res, path) {

  }
};


exports.handleRequest = function (req, res, path) {

  // if req.method in actions then action[req.method]()

  if ( req.method in actions ) {
    actions[req.method](res, path);
  }
  else {
    helpers.sendResponse(res, 404, 'NOT FOUND', headers);
  }
  
  
};

//helpers.headers['Content-Type']