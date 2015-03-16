const fs = require('fs');
const filename = process.argv[2];

if(!filename) {
  throw Error('A file to watch must be specified!');
}
fs.watch(filename, function(err) {
  if (err) {
    throw Error('File missing!');
  }
  console.log('File ' + filename + ' just changed!');
});
console.log('Now watching ' + filename + ' for changes...');
