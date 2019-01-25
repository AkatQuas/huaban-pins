const fs = require('fs-extra');

const resolve = require('path').resolve;

const outputDir =  resolve(__dirname, '..', 'output');


fs.readdir(outputDir, function (err, files) {
    if (err) { throw err; return; }
    console.log(files.filter(item => !item.endsWith('gitkeep')).length);
});