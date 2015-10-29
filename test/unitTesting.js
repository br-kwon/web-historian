var archive = require('../helpers/archive-helpers')



// archive.isUrlInList('google', function(exists){
//   if(exists){
//     console.log('google exists');
//   } else {
//     console.log("not found");
//   }
// });

// archive.addUrlToList('yahoo');

// archive.isUrlArchived('google', function(exists) {
//   if ( exists ) {
//     console.log('google exists');

//   } else {
//     console.log('not found');
//   }
// });

archive.readListOfUrls(function(data) {
  console.log(data);
});

archive.downloadUrls();