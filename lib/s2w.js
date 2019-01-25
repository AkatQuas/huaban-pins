const fs = require('fs-extra');

const resolve = require('path').resolve;

const sDir = (dir = '.') => resolve(__dirname, '..', 'source', dir);
const wDir = (dir = '.') => resolve(__dirname, '..', 'worker', dir);


const files = fs.readdirSync(sDir()).filter(item => item.endsWith('.json'));
const moveSync = file => fs.moveSync(sDir(file), wDir(file), { overwrite: true });;

if (files.length > 4) {
    for (let index = 0; index < 4; index++) {
        moveSync(files[index])
    }
} else {
    files.forEach(moveSync);
}
