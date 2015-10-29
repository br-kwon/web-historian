var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var contentTypes = {
  '.html' : 'Content-Type: text/html',
  '.ico' : 'Content-Type: image/vnd.microsoft.icon',
  '.css' : 'text/css'
};

var clientPaths = [
  '/index.html',
  '/loading.html',
  '/favicon.ico',
  '/styles.css'
];

//clientPaths = clientPaths.map( function(path) { return helpers.CLIENT_ROOT_DIR + path } );

var actions = {
  'GET' : function(res, pathname) {

    if( pathname === '/') {
      console.log('>>> path is /')
      pathname = clientPaths[0];
    }
    if( clientPaths.indexOf(pathname) !== -1 ){
      console.log('>>> entered other clientpaths')
      helpers.serveAssets(res, helpers.CLIENT_ROOT_DIR + pathname, 200, '', helpers.headers);
    } else if ( archive.isUrlArchived(pathname) ){
      helpers.serveAssets(res, helpers.ARCHIVE_ROOT_DIR + pathname, 200, '', helpers.headers);
    } else {
      helpers.sendResponse(res, 404, 'NOTFOUND', helpers.headers);
    }

  },
  'POST' : function(res, pathname) {

    archive.isUrlInList(pathname, function(exists) {
      if ( !exists ) {
        archive.addUrlToList(pathname);
        helpers.sendResponse(res, 200, 'thanks!', helpers.headers);
      } else {
        archive.isUrlArchived(pathname, function(exists) {
          if ( exists ) {
            helpers.headers['Location'] = pathname; //may have to remove first '/'
            helpers.serveAssets(res, helpers.ARCHIVE_ROOT_DIR + pathname, 302, '', helpers.headers);
          } else {
            helpers.headers['Location'] = '/loading.html'; //may have to add server name
            helpers.sendResponse(res, 302, '', helpers.headers);
          }
        })
      }

    });

  }
};


exports.handleRequest = function (req, res, pathname) {

  if ( path.extname(pathname) in contentTypes ) {
    helpers.headers['Content-Type'] = contentTypes[path.extname(pathname)];
  }
  if ( req.method in actions ) {
    actions[req.method](res, pathname);
  }
  else {
    helpers.sendResponse(res, 404, 'NOT FOUND', helpers.headers);
  }
  
};

