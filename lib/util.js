const logger = require('./logger').createLogger();

const type2ext = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/pjpeg': 'jpg'
}

const makeFilename = (boardtitle, text, type) => {
    const ext = type2ext[type] || 'png';

    return `${boardtitle}-${text}.${ext}`
}

const writeLog = ({ code, stdout, stderr, url }) => {
    let data = `*****\ndownloading url: ${url}\n\tcode: ${code}\n`;
    if (stdout) {
        data += `\tstdout: ${stdout}\n`;
    }
    if (stderr) {
        data += `\tstderr: ${stderr}\n`;
    }
    data += `*****\n`;
    logger.info(data);
}


module.exports = {
    makeFilename,
    writeLog
}