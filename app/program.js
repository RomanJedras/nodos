
const OSinfo = require('../modules/OSinfo');


process.stdin.setEncoding('utf-8');



process.stdin.on('readable', function() {
    // tutaj treść tego co ma się wykonać w momencie odczytania wejścia.
    let input = process.stdin.read();
    if(input !== null) {
        let instruction = input.toString().trim();

        console.log(instruction);

        switch (instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
             break;
            case '/envp':
                process.stdout.write('Info about  number of processors :' + process.env.NUMBER_OF_PROCESSORS + '\n' );
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



    }

});

