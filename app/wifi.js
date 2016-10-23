/**
 * MAIN Wireless controller dispatcher
 * WIP, having crossplatform issues, not used for now
 */
'use strict';

const   state = require('./server/state'),
        Wireless = require('wireless');

let initialized = false,
    wireless = null;

const init = function () {

    if (initialized) {
      return false;
    }

    initialized = true;

    wireless = new Wireless({
        iface: 'wlan0',
        updateFrequency: 10, // Optional, seconds to scan for networks
        connectionSpyFrequency: 2, // Optional, seconds to scan if connected
        vanishThreshold: 2, // Optional, how many scans before network considered gone
      });

    wireless.enable(function (err) {
        wireless.start();
      });

  };

const scan = function (cb) {
    var networks = wireless.list(),
        list = [];

    for (var network in networks) {
      list.push(networks[network]);
    }

    cb(list);
  };

const connect = function (arg, cb) {
    wireless.join(arg.wifi, arg.password, cb);
  };

module.exports = {
    init: init,
    scan: scan,
    connect: connect,
    isInitialized: function () {
        return initialized;
      },
  };

