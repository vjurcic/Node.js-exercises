/**
 * Server module
 * @author Viktor Jurcic
 * @module server
 */

var http = require('http');
var url = require('url');

/**
 * start() starts the server on
 * localhost:8888
 * 
 * @requires module:http
 * @requires module:url
 * @param {route} route - The callback that handles the routing
 * @param {Object} handle
 */
function start(route, handle) {
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received');
        route(handle, pathname, response, request);
    }).listen(8888);

    console.log('Server has started.');
}

exports.start = start;
