var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../public/http-helpers');

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

exports.readListOfUrls = function() {
};

exports.isUrlInList = function(path, callback) {
  var fileLocation = helpers.ARCHIVE_ROOT_DIR + '/sites.txt';
  var exists = false;

  fs.readFile(fileLocation, 'utf8', function(err, data) {
    if ( data.split("\n").indexOf(path) !== -1 ) {
      exists = true;
      if ( callback ) {
        callback(exists);
      }
    }
  });
};

exports.addUrlToList = function(url) {
  fs.appendFile(helpers.ARCHIVE_ROOT_DIR + '/sites.txt', url);
};

exports.isUrlArchived = function(path, callback) {
  var directory = helpers.ARCHIVE_ROOT_DIR;
  var exists = false;
  fs.readdir(directory, function(err, files) {

    if ( files.indexOf(path) !== -1 ) {
      exists = true;

      if (callback) {
        callback(exists);
      }
    }
  });

};

exports.downloadUrls = function() {
};
