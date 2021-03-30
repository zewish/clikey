module.exports = (msg, {
  stdout = process.stdout,
  stdin = process.stdin,
  encoding = 'utf8',
  lineBreak = true,
} = {}) => new Promise((resolve) => {
  stdout.write(msg);

  stdin.setRawMode(true);
  stdin.setEncoding(encoding);

  stdin
    .once('data', data => {
      stdin.pause();
      if (lineBreak) {
        stdout.write('\n');
      }

      resolve(`${data || ''}`);
    })
    .resume();
});
