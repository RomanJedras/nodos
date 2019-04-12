
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;
const OSinfo = require('./modules/OSinfo');

process.stdin.setEncoding('utf-8');
const StatMode = require('stat-mode');

// fs.stat('./cat.jpg', function(err, stats) {
//     let statMode = new StatMode(stats);
//     console.log(statMode.toString());
// });

// fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
//     console.log('Dane przed zapisem!'.blue);
//     console.log(data);
//     fs.writeFile('./tekst.txt', 'A tak wyglądają po zapisie!', function(err) {
//         if (err) throw err;
//         console.log('Zapisano!'.blue);
//         fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
//             console.log('Dane po zapisie'.blue)
//             console.log(data);
//         });
//     });
// });
// fs.exists(path.join(__dirname,"files","lorem.txt"),function (exists) {
//
//     if (exists) {
//         console.log("Plik istnieje");
//     } else {
//         console.log("Plik nie istnieje");
//     }
//
// });

// fs.stat(path.join(__dirname,"files","lorem2.txt"),function (err,stats) {
//
//     if (err) {
//         console.log(`Exist exceptenion:  ${err.message} `);
//         throw err.path;
//     }
//
//     console.log(`Data uyworzenia: ${stats.birthtime} `);
//     console.log(`Data ostatniej modyfikacji: ${stats.mtime} `);
//     console.log(`isFile: ${stats.isFile()} `);
//     console.log(`isDirectory: ${stats.isDirectory()} `);
// });


const params = {
    info1 : [],
    info2 : [],
    info3 : []
};


fs.readdir(path.join(__dirname,"files"),function (err, files) {

    if (err) {
        console.log(`Wystapił bład ${err.message}`);
        throw err;
    }

    files.forEach(function (filename, index) {
        fs.stat(path.join(__dirname,"files",filename),function (err,stats) {


            if(err) {
                console.log(`Wystapił bład ${err.message}`);
                throw err;
            }

             params.info1[index] = '\n' + `Informacje o plikach ${filename}`;
             params.info2[index] =  '\n' + `Data utworzenia ${stats.birthtime.getFullYear()} `;
             params.info3[index] =  '\n' + ` ${filename} is File: ${stats.isFile()}`;


            fs.writeFile(path.join(__dirname,"files", "info.txt"), params.info1 +'\n' + params.info2+'\n'+params.info3, function(err) {
                if (err) throw err; // jeśli pojawi się błąd, wyrzuć wyjątek
                console.log('Zapisano!');
            });

        })
    })


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

