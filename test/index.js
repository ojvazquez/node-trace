/* eslint-env mocha */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const fse = require('fs-extra');

const LOG_PATH = path.resolve('./logs_test/') + '/';

fse.removeSync(LOG_PATH);
const Trace = require('../index');
Trace.init({ logPath: LOG_PATH, isDev: false });

describe('Trace', () => {
  it('should have created logs/ folder if it did not exist', () => {
    assert.strictEqual(fs.existsSync(LOG_PATH), true);
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
    fse.copySync(`${LOG_PATH}info.json`, `${LOG_PATH}info-tmp.json`);
  });

  it('should create info.json file', () => {
    assert.doesNotThrow(() => {
      fs.accessSync(`${LOG_PATH}info.json`);
    }, TypeError);
  });

  it('should add the messages to log file in JSON format', () => {
    assert.doesNotThrow(() => {
      JSON.parse(fs.readFileSync(`${LOG_PATH}info-tmp.json`, 'utf-8'));
    });
  });

  it('should add "kill me please" message to log file', () => {
    let message = require(`${LOG_PATH}info-tmp.json`).msg;

    assert.strictEqual(message, 'kill me please');
  });

  after(() => {
    fs.unlinkSync(`${LOG_PATH}info-tmp.json`);
  });
});

describe('Trace.warn()', () => {
  before(() => {
    Trace.warn('kill me please');

    fse.copySync(`${LOG_PATH}warn.json`, `${LOG_PATH}warn-tmp.json`);
  });

  it('should create warn.json file', () => {
    assert.doesNotThrow(() => {
      fs.accessSync(`${LOG_PATH}warn.json`);
    }, TypeError);
  });

  it('should add the messages to log file in JSON format', () => {
    assert.doesNotThrow(() => {
      JSON.parse(fs.readFileSync(`${LOG_PATH}warn-tmp.json`, 'utf-8'));
    });
  });

  it('should add "kill me please" message to log file', () => {
    let message = require(`${LOG_PATH}warn-tmp.json`).msg;

    assert.strictEqual(message, 'kill me please');
  });

  after(() => {
    fs.unlinkSync(`${LOG_PATH}warn-tmp.json`);
  });
});

describe('Trace.error()', () => {
  before(() => {
    let err = new Error('Something went wrong');
    Trace.error('kill me please', err);

    fse.copySync(`${LOG_PATH}error.json`, `${LOG_PATH}error-tmp.json`);
  });

  it('should create error.json file', () => {
    assert.doesNotThrow(() => {
      fs.accessSync(`${LOG_PATH}error.json`);
    }, TypeError);
  });

  it('should add the messages to log file in JSON format', () => {
    assert.doesNotThrow(() => {
      JSON.parse(fs.readFileSync(`${LOG_PATH}error-tmp.json`, 'utf-8'));
    });
  });

  it('should add "kill me please" message to log file', () => {
    let message = require(`${LOG_PATH}error-tmp.json`).msg;

    assert.ok(message.includes('kill me please'));
  });

  it('should include error stack along the message', () => {
    let message = require(`${LOG_PATH}error-tmp.json`).msg;

    assert.ok(message.includes('Something went wrong'));
  });

  after(() => {
    fs.unlinkSync(`${LOG_PATH}error-tmp.json`);
  });
});

// TODO: Close stream and remove the LOG_PATH.
after(() => {
  // fse.removeSync(LOG_PATH);
});
