
const http = require('http');
const color = require('colors');
const fs = require('fs');
const path = require('path');
const pathFiles = path.join(__dirname, '.') + '\\';


process.stdin.setEncoding('utf-8');


const server = http.createServer();
let html, header;

server.on('request', function (request, response) {

    response.setHeader("Content-Type", "text/html; charset=utf-8");

    if (request.method === 'GET' && request.url === '/') {
    	html = fs.readFileSync(pathFiles + 'index.html','utf8');
	    let header = 'Witaj Świecie';
    	html = html.replace('{ Header }', header);
    	response.end(html);
    } else {
        response.statusCode = 404;
        
        html = fs.readFileSync(pathFiles + 'errror.html');
	    response.end(html);
    }
}).listen(9000);

console.log('Server run on port : 9000'.blue);


