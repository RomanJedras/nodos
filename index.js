
const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
const OSinfo = require('./modules/OSinfo');

process.stdin.setEncoding('utf-8');
const StatMode = require('stat-mode');

fs.stat('./cat.jpg', function(err, stats) {
    let statMode = new StatMode(stats);
    console.log(statMode.toString());
});

fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
    console.log('Dane przed zapisem!'.blue);
    console.log(data);
    fs.writeFile('./tekst.txt', 'A tak wyglądają po zapisie!', function(err) {
        if (err) throw err;
        console.log('Zapisano!'.blue);
        fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
            console.log('Dane po zapisie'.blue)
            console.log(data);
        });
    });
});

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

