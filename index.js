'use strict';

module.exports = (msg, { stdout, stdin, encoding = 'utf8' } = process) => {
    return new Promise((resolve, reject) => {
        stdout.write(msg);

        stdin.setRawMode(true);
        stdin.setEncoding(encoding);

        stdin.once('data', data => {
            stdin.pause();
            stdout.write('\n');

            resolve(`${data || ''}`);
        })
        .resume();
    });
};
