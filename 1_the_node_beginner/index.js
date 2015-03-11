/**
 * Main binding file
 * @author Viktor Jurcic
 */

// import modules
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// define handlers for URI
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

// start the server
server.start(router.route, handle);