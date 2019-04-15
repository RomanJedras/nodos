function time (v) {
	if (v) {
		let seconds = v % 60;
		let minutes = Math.floor((v % 3600) / 60);
		let hours = Math.floor(v / 3600);
		
		return hours + 'h' + ":" + ((minutes < 10) ? "0" + minutes + ' min' : minutes + ' min') + ":" + ((seconds < 10) ? "0" + seconds + ' sec.' : seconds + ' sec.');
	}
}

module.exports = time;

