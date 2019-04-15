const fs = require('fs');
const path = require('path');


process.stdin.setEncoding('utf-8');

const writable = fs.createWriteStream(path.join(__dirname,"files")+ '\\readme1.txt',{encoding: 'utf8'})

const readable = fs.createReadStream(path.join(__dirname,"files")+ '\\readme.txt',{encoding: 'utf8'});
readable.on('data',function (chunk) {
	writable.write(chunk);
});










