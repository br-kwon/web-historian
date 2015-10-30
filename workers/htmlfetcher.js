// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('/Users/student/2015-10-web-historian/helpers/archive-helpers');
var fs = require('fs');

archive.readListOfUrls(function(urlArray) {
  var numDownloads = urlArray.length;
  var numCompleted = 0;
  urlArray.forEach( function(url) {
    archive.downloadUrl(url, function(){
      var urlIdx = urlArray.indexOf(url);
      urlArray.splice(urlIdx, 1);
      numCompleted ++;
      if ( numCompleted >= numDownloads ) {
        fs.writeFile(archive.paths.list, '', 'utf8', function() {
          urlArray.forEach( function(url) {
            archive.addUrlToList(url);
          });
        });
      }
    });
  });
});

