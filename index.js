const fs = require('fs');
const path = require('path');


process.stdin.setEncoding('utf-8');

const pathFiles = path.join(__dirname,'files');

fs.readdir(pathFiles,function (error,fileList) {
	
	fileList.forEach(function (item,index) {
		
	
		if (index > 0) {
			fs.rename(pathFiles + "\\" + item, pathFiles + "\\" + 'readme' + index + '.txt', function (error) {
				console.log(error);
			});
		} else {
			fs.rename(pathFiles + "\\" + item, pathFiles + "\\" + 'readme.txt', function (error) {
				console.log(error);
			});
		}
		
	});
});





