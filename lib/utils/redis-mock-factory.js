'use strict';

const RedisMock = require('../server/redis-mock');

let knownRedisHosts = {};

const getUrl = (opts) => opts.host + ':' + opts.port + (opts.path || '');

module.exports.getRedisMock = (createClientOptions) => {
  const url = getUrl(getUrl(createClientOptions));

  if (!knownRedisHosts[url]) {
    knownRedisHosts[url] = new RedisMock({
      return_buffers: createClientOptions.return_buffers
    });
  }

  return knownRedisHosts[url];
};

module.exports.clear = () => {
  knownRedisHosts = {};
};
