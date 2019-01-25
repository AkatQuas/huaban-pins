const fs = require('fs-extra');
const resolve = require('path').resolve;
const shell = require('shelljs');
const sleep = require('sleep');
const { makeFilename, writeLog } = require('./util');

const hash2Url = hash => `http://img.hb.meiwu.co/${hash}`;

const sourceDir = (dir = '.') => resolve(__dirname, 'worker', dir);

function main() {
    const source = sourceDir();
    const files = fs.readdirSync(source).filter(item => item.endsWith('.json'));
    files.forEach(file => {
        const name = sourceDir(file);
        const content = fs.readJsonSync(name);
        content.forEach(download);
        sleep.sleep(30);
    });
}

function download(item) {
    const file = makeFilename(item.board.title, item.raw_text, item.file.type);
    const url = hash2Url(item.file.key);
    const script = `aria2c -d $PWD/output --retry-wait=10 ${url} `;
    shell.exec(script, { silent: true, async: true }, (code, stdout, stderr) => {
        writeLog({
            url, code, stdout, stderr
        });
    })
    sleep.sleep(2);
}

main();