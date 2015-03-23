const fs = require('fs');
fs.watch('target.txt', function(event) {
  console.log('File "target.txt" just changed! ' + 'Event was: ' + event);
});
console.log('Now watching target.txt for changes...');
