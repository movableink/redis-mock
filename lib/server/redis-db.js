'use strict';

const helpers = require('../helpers');

class RedisDb {

  constructor(options={}) {
    this.storage = {};
    this.options = options;
  }

  flushdb(callback) {
    this.storage = {};

    helpers.callCallback(callback, null, 'OK');
  }

  time(callback) {
    const now = Date.now();
    helpers.callCallback(callback, null, [
      Math.floor(now / 1000).toString(),
      ((now % 1000) * 1000).toString()
    ]);
  }
}

/**
 * Import all methods
 *
 * The server contains a log of logic. It only feels natural to split it into multiple files
 */
['./strings', './keys', './hash', './set', './list.js', './sortedset', './script']
  .forEach((lib) => Object.assign(RedisDb.prototype, require(lib)));

module.exports = RedisDb;
