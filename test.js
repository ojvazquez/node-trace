/* eslint-env mocha */
'use strict';

const assert = require('assert');
const fs = require('fs');
const fse = require('fs-extra');

const LOG_FOLDER = './logs/';
process.env.NODE_ENV = 'test';

fse.removeSync(LOG_FOLDER);
const Trace = require('./');

describe('Trace', () => {
  it('should have created logs/ folder if it did not exist', () => {
    assert.strictEqual(fs.existsSync(LOG_FOLDER), true);
  });

  it('should throw an exception if tried to instantiate with new', () => {
    assert.throws(() => {
      let logger = new Trace();
      logger.info('wont reach here.');
    }, TypeError);
  });
});

describe('Trace.info()', () => {
  before(() => {
    Trace.info('kill me please');
    fse.copySync(`${LOG_FOLDER}info.json`, `${LOG_FOLDER}info-tmp.json`);
  });

  it('should create info.json file', () => {
    assert.doesNotThrow(() => {
      fs.accessSync(`${LOG_FOLDER}info.json`);
    }, TypeError);
  });

  it('should add the messages to log file in JSON format', () => {
    assert.doesNotThrow(() => {
      JSON.parse(fs.readFileSync(`${LOG_FOLDER}info-tmp.json`, 'utf-8'));
    });
  });

  it('should add "kill me please" message to log file', () => {
    let message = require(`${LOG_FOLDER}info-tmp.json`).msg;

    assert.strictEqual(message, 'kill me please');
  });

  after(() => {
    fs.unlinkSync(`${LOG_FOLDER}info-tmp.json`);
  });
});

describe('Trace.warn()', () => {
  before(() => {
    Trace.warn('kill me please');

    fse.copySync(`${LOG_FOLDER}warn.json`, `${LOG_FOLDER}warn-tmp.json`);
  });

  it('should create warn.json file', () => {
    assert.doesNotThrow(() => {
      fs.accessSync(`${LOG_FOLDER}warn.json`);
    }, TypeError);
  });

  it('should add the messages to log file in JSON format', () => {
    assert.doesNotThrow(() => {
      JSON.parse(fs.readFileSync(`${LOG_FOLDER}warn-tmp.json`, 'utf-8'));
    });
  });

  it('should add "kill me please" message to log file', () => {
    let message = require(`${LOG_FOLDER}warn-tmp.json`).msg;

    assert.strictEqual(message, 'kill me please');
  });

  after(() => {
    fs.unlinkSync(`${LOG_FOLDER}warn-tmp.json`);
  });
});

describe('Trace.error()', () => {
  before(() => {
    let err = new Error('Something went wrong');
    Trace.error(err, 'kill me please');

    fse.copySync(`${LOG_FOLDER}error.json`, `${LOG_FOLDER}error-tmp.json`);
  });

  it('should create error.json file', () => {
    assert.doesNotThrow(() => {
      fs.accessSync(`${LOG_FOLDER}error.json`);
    }, TypeError);
  });

  it('should add the messages to log file in JSON format', () => {
    assert.doesNotThrow(() => {
      JSON.parse(fs.readFileSync(`${LOG_FOLDER}error-tmp.json`, 'utf-8'));
    });
  });

  it('should add "kill me please" message to log file', () => {
    let message = require(`${LOG_FOLDER}error-tmp.json`).msg;

    assert.strictEqual(message, 'kill me please');
  });

  it('should include error stack along the message', () => {
    let entry = require(`${LOG_FOLDER}error-tmp.json`);

    assert.ok(entry.err.stack.toString().includes('Something went wrong'));
  });

  after(() => {
    fs.unlinkSync(`${LOG_FOLDER}error-tmp.json`);
  });
});
