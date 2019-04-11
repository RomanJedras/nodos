
const os = require('os');
let time = require('./time');

function getOSinfo() {
    let type = os.type();

    if(type === 'Darwin') {
        type = 'OSX';
    } else if(type === 'Windows_NT') {
        type = 'Windows';
    }

    let release = os.release();
    let cpu = os.cpus()[0].model;
    let uptime = os.uptime();
    let userInfo = os.userInfo();

    console.log('System:', type);
    console.log('Release:', release);
    console.log('CPU model:', cpu);
    console.log('Uptime: ~', time(uptime));
    console.log('User name:', userInfo.username);
    console.log('Home dir:', userInfo.homedir);
}

exports.print = getOSinfo;