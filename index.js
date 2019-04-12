
const fs = require('fs');
const path = require('path');


process.stdin.setEncoding('utf-8');

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






