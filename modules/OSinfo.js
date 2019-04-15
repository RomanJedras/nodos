const os = require('os');
const colors = require('colors');


let time = require('./time');

function getOSinfo () {
	let type = os.type();
	
	if (type === 'Darwin') {
		type = 'OSX';
	} else if (type === 'Windows_NT') {
		type = 'Windows';
	}
	
	let release = os.release();
	let cpu = os.cpus()[0].model;
	let uptime = os.uptime();
	let userInfo = os.userInfo();
	
	console.log('System:'.gray, type);
	console.log('Release:'.red, release);
	console.log('CPU model:'.blue, cpu);
	console.log('Uptime: ~'.green, time(uptime));
	console.log('User name:'.yellow, userInfo.username);
	console.log('Home dir:'.white, userInfo.homedir);
}

exports.print = getOSinfo;