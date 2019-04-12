
const http = require('http');
const fs = require('fs');
const path = require('path');

const EventEmitter = require('events').EventEmitter;
const OSinfo = require('./modules/OSinfo');

process.stdin.setEncoding('utf-8');
const StatMode = require('stat-mode');

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



server.listen(9000, function () {
    console.log('Serwer został uruchomiony na porcie http://localhost:9000')
});




//
 const emitter = new EventEmitter();

emitter.on('beforeCommand', function(instruction) {
    console.log('You wrote: ' + instruction + ' trying to run command.')
});
emitter.on('afterCommand', function() {
    console.log('Finished command');
});



process.stdin.on('readable', function() {
    // tutaj treść tego co ma się wykonać w momencie odczytania wejścia.
    let input = process.stdin.read();
    if(input !== null) {
        let instruction = input.toString().trim();
        // odpalanie zdarzenia beforeCommand (z parametrem)
        emitter.emit('beforeCommand', instruction);

        switch (instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
             break;
            case '/envp':
                process.stdout.write('Info about  number of processors :' + process.env.NUMBER_OF_PROCESSORS + '\n' );
                console.log(process.env);
             break;
            case '/sayhello':
                process.stdout.write('hello!\n');
                break;
            case '/getOSinfo':
                OSinfo.print();
                break;
            default:
                process.stderr.write('Wrong instruction!\n');
        }

        // emitowanie zdarzenia afterCommand (bez parametru)
        emitter.emit('afterCommand');

    }

});

