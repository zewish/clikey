#!/usr/bin/env node
const clikey = require('./index');

(async () => {
  const answer = await clikey('Are you sure? [y/N]');

  if (answer.toLowerCase() === 'y') {
    return console.log('You said YES!!!');
  }

  console.log('You said NO');
})();
