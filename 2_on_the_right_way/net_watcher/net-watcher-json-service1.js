"use strict";
const fs = require('fs');
const net = require('net');
const events = require('events');
const filename = process.argv[2];

const watcher = fs.watch(filename)

const server = net.createServer(function(connection) {
  // reporting
  console.log('Subscriber connected.');
  connection.write(JSON.stringify({
    type: 'watching',
    file: filename
  }) + '\n');

  // watcher setup
  watcher.on('change', function() {
    connection.write(JSON.stringify({
      type: 'changed',
      file: filename,
      timestamp: Date.now()
    }) + '\n');
  });

  // cleanup
  connection.on('close', function() {
    console.log('Subscriber disconnected.');
    //watcher.close();
  });

});

if (!filename) {
  throw Error('No target filename was specified.');
}

server.listen(5432, function() {
  console.log('Listening for subscribers...');
});
