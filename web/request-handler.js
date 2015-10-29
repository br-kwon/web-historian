var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var contentTypes = {
  '.html' : 'Content-Type: text/html',
  '.ico' : 'Content-Type: image/vnd.microsoft.icon',
  '.css' : 'Content-Type: styles/css'
};
var actions = {
  'GET' : function(res, pathname) {
    // index.html or loading.html
    if ( pathname === helpers.CLIENT_ROOT_DIR + '/index.html' || pathname === helpers.CLIENT_ROOT_DIR + '/loading.html' ) {
      helpers.serveAssets(res, pathname, 200, '', helpers.headers);
    }
    // else if path = '/favicon.ico' || path = '/styles.css' 
      // 
    // else if path = '/loading.html'
      // submit response
        // payload = loading.html
        // response code = 200
    // else if path is within archives
      // serve site
    // else
      // 404

  },
  'POST' : function(res, pathname) {
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


exports.handleRequest = function (req, res, pathname) {

  if ( path.extname(pathname) in contentTypes ) {
    helpers.headers = contentTypes[path.extname(pathname)];
  }
  if ( req.method in actions ) {
    actions[req.method](res, pathname);
  }
  else {
    helpers.sendResponse(res, 404, 'NOT FOUND', helpers.headers);
  }
  
};

