'use strict';

require('chai')
.use(require('sinon-chai'))
.use(require('chai-as-promised'))
.should();

const { spy } = require('sinon');
const clikey = require('./index.js');

describe('exports', () => {
    it('exports a fn', () => {
        clikey.should.be.a('function');
    });
});

describe('stdin, stdout', () => {
    let stdin, stdout, optsMock;
    let res;

    const msg = 'some msg';
    const data = 'wow data!';

    beforeEach(async () => {
        stdout = {
            write: spy(() => {
                console.log();
            })
        };

        stdin = {
            write: spy(() => {}),
            setRawMode: spy(() => {}),
            setEncoding: spy(() => {}),
            pause: spy(() => {}),
            resume: spy(() => {}),
            once: spy((eventName, cb) => {
                stdin[`__event_${eventName}`] = cb;
                return stdin;
            })
        };

        optsMock = {
            stdout,
            stdin,
            encoding: 'utf16'
        };

        res = clikey(msg, optsMock);
        stdin.__event_data(data);

        await res;
    });

    it('resolves with data entered', () => {
        return res.should.be.eventually.equal(data);
    });

    it('calls stdout.write()', () => {
        stdout.write
        .should.have.callCount(2);
    });

    it('calls stdout.write(msg)', () => {
        stdout.write.firstCall.calledWith(msg)
        .should.be.true;
    });

    it('calls stdout.write("\\n")', () => {
        stdout.write.secondCall.calledWith('\n')
        .should.be.true;
    });

    it('calls stdin.setRawMode()', () => {
        stdin.setRawMode
        .should.be.calledWith(true);
    });

    it('calls stdin.setEncoding()', () => {
        stdin.setEncoding
        .should.be.calledWith(optsMock.encoding);
    });

    it('calls stdin.once()', () => {
        stdin.once
        .should.be.calledWith('data', stdin.__event_data);
    });

    it('calls stdin.pause()', () => {
        stdin.pause
        .should.have.callCount(1);
    });

    it('calls stdin.resume()', () => {
        stdin.resume
        .should.have.callCount(1);
    });
});
