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
 * @requires http, url modules
 * @param {function} route
 * @param {object} handle
 * @returns {undefined}
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
