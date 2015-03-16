const fs = require('fs');
fs.writeFile('target.txt', 'clever message', function (err) {
  if (err) {
    throw err;
  }
  console.log('File saved!');
});

