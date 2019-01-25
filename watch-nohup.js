const shell = require('shelljs');
const fs = require('fs-extra');
const resolve = require('path').resolve;

const sourceDir = resolve(__dirname, 'source');
const script = 'nohup npm run download &';
function runOne() {
    shell.exec(script, { silent: true, async: true }, (code, stdout, stderr) => {
        const l = fs.readdirSync(sourceDir).filter(item => item.endsWith('.json')).length;
        if (l > 0) {
            setTimeout(() => {
                runOne();
            }, 5000);
        } else {
            console.log('no files, job\'s done');
        }
    });
}

runOne();