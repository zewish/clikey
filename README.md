## clikey

Prompts for a single keypress in a node.js CLI app

#### Usage
```javascript
#!/usr/bin/env node
'use strict';

const clikey = require('clikey');

(async () => {
    const answer = await clikey('Are you sure? [y/N]');
    // answer received when a single key is pressed

    if (answer.toLowerCase() === 'y') {
        return console.log('You said YES!!!');
    }

    console.log('You said NO');
})();
```

#### Install
```bash
$ npm install --save clikey
```

#### Test
```bash
$ npm install && npm test
```
