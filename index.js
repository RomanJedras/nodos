
const http = require('http');
// const fs = require('fs');
// const path = require('path');



process.stdin.setEncoding('utf-8');


const server = http.createServer();

server.on('request', function (request, response) {

    response.setHeader("Content-Type", "text/html; charset=utf-8");

    response.write(`${request.httpVersion} ${request.method}`);
    response.write("<br>");
    response.write(`<pre>${JSON.stringify(request.headers,null,4)}</pre>`);

    if (request.method === 'GET' && request.url === '/hello') {

        response.write('<h1>Hello World!</h1>');
        response.end();
    } else {
        response.statusCode = 404;
        response.write('<h1>404: Zła ścieżka!</h1>');
        response.end();
    }
});


