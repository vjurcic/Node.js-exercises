/**
 * Request handler module
 * @author Viktor Jurcic
 * @module requestHandlers
 */

var fs = require('fs');
var formidable = require('formidable');

/**
 * start() writes the upload page
 * 
 * @param {Object} response
 * @param {Object} request
 * @returns {undefined}
 */
function start(response, request) {
    console.log('Request handler "start" was called.');

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload" multiple="multiple">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

/**
 * upload() stores and displays the sent image file
 * 
 * @requires module:formidable
 * @requires module:fs
 * @param {Object} response
 * @param {Object} request
 * @returns {undefined}
 */
function upload(response, request) {
    console.log('Request handler "upload" was called.');
    
    var form = new formidable.IncomingForm();
    console.log('about to parse');
    form.parse(request, function(error, fields, files) {
        console.log('parsing done');
        
        fs.rename(files.upload.path, '/tmp/test.png', function(error) {
            if(error) {
                fs.unlink('/tmp/test.png');
                fs.rename(files.upload.path, '/tmp/test.png');
            }
        });
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('received image:<br/>');
        response.write('<img src="/show" />');
        response.end();
    });
}

/**
 * show() writes the uploaded image
 * 
 * @requires module:fs
 * @param {Object} response
 * @returns {undefined}
 */
function show(response) {
    console.log('Request handler "show" was called.');
    response.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('/tmp/test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
