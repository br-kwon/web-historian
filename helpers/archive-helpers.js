var fs = require('fs');
var path = require('path');
// var _ = require('/Users/student/2015-10-web-historian/node_modules/underscore');
// var httpRequest = require('/Users/student/2015-10-web-historian/node_modules/http-request');

var _ = require('underscore');
var httpRequest = require('http-request');

// ABSOLUTE PATH
var mainDir = '/Users/student/2015-10-web-historian/';


// RELATIVE PATH NAMES
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archives: path.join(__dirname, '../archives'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// ABSOLUTE PATH NAMES
// exports.paths = {
//   siteAssets: mainDir + 'web/public',
//   archives: mainDir + 'archives',
//   archivedSites: mainDir + 'archives/sites',
//   list: mainDir + 'archives/sites.txt'
// };

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (!data) {
      data = '';
    }
    if ( callback ) {
      callback(data.split("\n"));
    }
  });

};

exports.isUrlInList = function(path, callback) {
  var exists = false;

  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (!data) {
      data = '';
    }
    if ( data.split("\n").indexOf(path) !== -1 ) {
      exists = true;
    }
    if ( callback ) {
      callback(exists);
    }
  });
};

exports.addUrlToList = function(url) {
  fs.appendFile(exports.paths.list, "\n" + url);
};

exports.isUrlArchived = function(path, callback) {
  console.log('>>> isUrlArchived' + path);
  var exists = false;
  fs.readdir(exports.paths.archivedSites, function(err, files) {

    if ( files.indexOf(path) !== -1 ) {
      exists = true;
    }
    if (callback) {
      callback(exists);
    }
  });

};

exports.downloadUrl = function(link, callback) {
  httpRequest.get({
    url: link,
    progress: function (current, total) {
      console.log('downloaded %d bytes from %d', current, total);
    }
  }, exports.paths.archivedSites + '/' + link + '.html', function (err, res) {
    if (err) {
      console.error(err);
      return;
    }
    if (callback) {
      callback();
    }
    console.log(res.code, res.headers, res.file);
  });

}

// exports.downloadUrls = function(callback) {
//   //readListOfUrls and download into archive
  

//   exports.readListOfUrls(function(urls) {
//     urls.forEach(function(link) {
//       exports.downloadUrl(link, function() {
//         count++;
//         if ( count > /*the number of urls that we're downloading*/ ) {
//           callback();
//         }
//       });
//     });
//   });
// };

