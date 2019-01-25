const fs = require('fs-extra');

const resolve = require('path').resolve;

const dDir = (dir = '.') => resolve(__dirname, '..', 'done', dir);
const wDir = (dir = '.') => resolve(__dirname, '..', 'worker', dir);


const files = fs.readdirSync(wDir()).filter(item => item.endsWith('.json'));

files.forEach(el => {
    fs.moveSync(wDir(el), dDir(el), { overwrite: true });
});