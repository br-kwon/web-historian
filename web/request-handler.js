var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var contentTypes = {
  '.html' : 'text/html',
  '.ico' : 'image/vnd.microsoft.icon',
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
  'GET' : function(req, res, pathname) {
    
    if( pathname === '/') {
      pathname = clientPaths[0];
    }
    if( clientPaths.indexOf(pathname) !== -1 ){
      helpers.serveAssets(res, helpers.CLIENT_ROOT_DIR + pathname, 200, '', helpers.headers);
    } else {
      archive.isUrlArchived(pathname.slice(1), function(exists) { 
        if ( exists ) {
          helpers.serveAssets(res, helpers.ARCHIVE_ROOT_DIR + '/sites' + pathname, 200, '', helpers.headers);
        } else {
          helpers.sendResponse(res, 404, 'NOTFOUND', helpers.headers);
        }
      });
    }
  },
  'POST' : function(req, res, pathname) {

    //need to check if urLInList of the payLoad
    var payLoad = '';
    req.on('data', function(chunk){
      payLoad += chunk;
    });
    req.on('end', function(){
      payLoad = payLoad.slice(4);
      payLoadHandler();
    });

    var payLoadHandler = function(){

      archive.isUrlArchived(payLoad, function(exists){
        if ( exists ){
          helpers.headers['Location'] = payLoad;
          helpers.serveAssets(res, helpers.ARCHIVE_ROOT_DIR + '/sites/' + payLoad, 302, '', helpers.headers);
        } else {
          archive.isUrlInList(payLoad, function(exists){
            if ( exists ){
              helpers.headers['Location'] = '/loading.html';
              helpers.sendResponse(res, 302, '', helpers.headers);
            } else {
              archive.addUrlToList(payLoad);
              helpers.sendResponse(res, 200, 'thanks', helpers.headers);
            }
          });
        }
      });


      // archive.isUrlInList(payLoad, function(exists){
      //   if( !exists ){
      //     archive.addUrlToList(payLoad);
      //     helpers.sendResponse(res, 200, 'thanks', helpers.headers);
      //   } else {
      //     archive.isUrlArchived(payLoad, function(exists){
      //       if( exists ){
      //         helpers.headers['Location'] = payLoad;
      //         helpers.serveAssets(res, helpers.ARCHIVE_ROOT_DIR + '/sites/' + payLoad, 302, '', helpers.headers);
      //       } else {
      //         helpers.headers['Location'] = '/loading.html';
      //         helpers.sendResponse(res, 302, '', helpers.headers);
      //        }
      //     })
      //   };
      // });
    }
  }
};


exports.handleRequest = function (req, res, pathname) {

  if ( path.extname(pathname) in contentTypes ) {
    helpers.headers['Content-Type'] = contentTypes[path.extname(pathname)];
  }
  else {
   helpers.headers['Content-Type'] = contentTypes['.html']; 
  }
  if ( req.method in actions ) {
    actions[req.method](req, res, pathname);
  }
  else {
    helpers.sendResponse(res, 404, 'NOT FOUND', helpers.headers);
  }
  
};

