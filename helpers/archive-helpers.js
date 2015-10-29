var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */


exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

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

exports.downloadUrls = function() {
  //readListOfUrls and download into archive
  exports.readListOfUrls(function(urls) {
    urls.forEach(function(link) {
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
        
        console.log(res.code, res.headers, res.file);
      });
      // httpRequest.saveFile(exports.paths.archivedSites + '/' + url, function(err, data) {

        
      // }); 

    });
  });
};

