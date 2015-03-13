/**
 * Router module
 * @author Viktor Jurcic
 * @module router
 */

/**
 * route() calls the apropriate handler
 * for given pathname
 * 
 * @callback route
 * @param {object} handle
 * @param {string} pathname
 * @param {object} response
 * @param {object} request
 * @returns {unresolved}
 */
function route(handle, pathname, response, request) {
    console.log('About to route a request for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, request);
    } else {
        console.log('No request handler found for ' + pathname);
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not found');
        response.end();
    }
}

exports.route = route;
