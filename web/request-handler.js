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
    if ( path === helpers.CLIENT_ROOT_DIR + '/index.html' || path === helpers.CLIENT_ROOT_DIR + '/loading.html' ) {
      helpers.serveAssets(res, path, 200, '', helpers.headers);
    }
    // else if path = '/loading.html'
      // submit response
        // payload = loading.html
        // response code = 200
    // else if path is within archives
      // serve site
    // else
      // 404

  },
  'POST' : function(res, path) {
    // if path !exists in sites.txt
      // write to sites.txt
      // submit response
        // payload = 'thank you'
        // response code = 200
    // else
      // if exists in archives/sites
        // read from archives/sites
        // submit response
          // payload = empty
          // response code = 302
          // headers['location'] = /site
      // else
        // submit response
          // payload = empty
          // response code = 302
          // headers['location'] = /loading.html
  }
};


exports.handleRequest = function (req, res, path) {

  // if req.method in actions then action[req.method]()

  if ( req.method in actions ) {
    actions[req.method](res, path);
  }
  else {
    helpers.sendResponse(res, 404, 'NOT FOUND', helpers.headers);
  }
  
  
};

//helpers.headers['Content-Type']