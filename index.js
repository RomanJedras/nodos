
const http = require('http');
const color = require('colors');
const fs = require('fs');
const path = require('path');
const pathFiles = path.join(__dirname, '.') + '\\';


process.stdin.setEncoding('utf-8');

const MIME_TYPES = {
	".html": "text/html",
	".css": "text/css",
	".jpg": "image/jpeg"
}


const server = http.createServer();
let html, header;



server.on('request', function (request, response) {
	
	let fileName = null;

    if (request.url === '/' || request.url === '/index.html') {
    	fileName = 'index.html';
    	html = fs.readFileSync(pathFiles + fileName,'utf8');
	    header = 'Witaj Świecie';
    	html = html.replace('{ Header }', header);
    	response.end(html);
    } else {
        response.statusCode = 404;
        fileName = 'errror.html';
        html = fs.readFileSync(pathFiles + fileName);
	    response.end(html);
    }
	console.log(MIME_TYPES[path.extname(fileName)].red);
	response.writeHead(200,{"Content-Type": MIME_TYPES[path.extname(fileName)]});
 
}).listen(9000);

console.log('Server run on port : 9000'.blue);


