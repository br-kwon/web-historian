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
    console.log('>>>' + pathname);
    
    if( pathname === '/') {
      pathname = clientPaths[0];
    }
    if( clientPaths.indexOf(pathname) !== -1 ){
      helpers.serveAssets(res, helpers.CLIENT_ROOT_DIR + pathname, 200, '', helpers.headers);
    } else if ( archive.isUrlArchived(pathname.slice(1)) ){ //NEED TO PUT IN CALLBACK
      helpers.serveAssets(res, helpers.ARCHIVE_ROOT_DIR + '/sites' + pathname, 200, '', helpers.headers);
    } else {
      console.log('THIS IS OUR 404');
      helpers.sendResponse(res, 404, 'NOTFOUND', helpers.headers);
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

      archive.isUrlInList(payLoad, function(exists){
        if( !exists ){
            //console.log(payLoad + ' doesnt exist');
          archive.addUrlToList(payLoad);
          helpers.sendResponse(res, 200, 'thanks', helpers.headers);
        } else {
            //console.log(payLoad + ' exists')
          archive.isUrlArchived(payLoad, function(exists){
            if( exists ){
              helpers.headers['Location'] = 'hotmail.com';
              helpers.serveAssets(res, helpers.ARCHIVE_ROOT_DIR + '/sites/' + payLoad, 302, '', helpers.headers);
            } else {
              helpers.headers['Location'] = '/loading.html';
              helpers.sendResponse(res, 302, '', helpers.headers);
             }
          })
        };
      });
    }





    // archive.isUrlInList(pathname, function(exists) {
    //   if ( !exists ) {
    //     console.log(pathname);
    //     var payLoad = '';
    //     req.on('data', function(chunk) {
    //       payLoad += chunk;
    //     });
    //     req.on('end', function() {
    //       archive.addUrlToList(payLoad);
    //       helpers.sendResponse(res, 200, 'thanks!', helpers.headers);
    //     });

    //   } else {
    //     archive.isUrlArchived(pathname, function(exists) {
    //       if ( exists ) {
    //         helpers.headers['Location'] = pathname; //may have to remove first '/'
    //         helpers.serveAssets(res, helpers.ARCHIVE_ROOT_DIR + pathname, 302, '', helpers.headers);
    //       } else {
    //         helpers.headers['Location'] = '/loading.html'; //may have to add server name
    //         helpers.sendResponse(res, 302, '', helpers.headers);
    //       }
    //     })
    //   }

    // });

  }
};


exports.handleRequest = function (req, res, pathname) {

  if ( path.extname(pathname) in contentTypes ) {
    helpers.headers['Content-Type'] = contentTypes[path.extname(pathname)];
  }
  if ( req.method in actions ) {
    actions[req.method](req, res, pathname);
  }
  else {
    helpers.sendResponse(res, 404, 'NOT FOUND', helpers.headers);
  }
  
};

