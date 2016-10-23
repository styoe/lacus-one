const RELAYS_CONFIG = require('../conf').RELAYS_CONFIG,
    DEBUG = require('../conf').DEBUG,
    serialport = require('serialport'),
    Raspi = require('raspi-io'),
    five = require('johnny-five'),
    relayFactory = require('./devices/relay'),
    tmphig = require('./devices/tmphig'),
    io = new Raspi(),
    board = new five.Board({
        io: io,
      });

let ready = false;

const devices = {
    list: [],
    isReady: function () {
        return ready;
      },
  };

board.on('ready', function () {
    if (DEBUG) console.log('board ready');

    let inject = {};

    // SETUP RELAYS
    for (let rel of RELAYS_CONFIG) {
      let relay = relayFactory(rel);

      devices.list.push(relay);
      inject[relay.uid] = relay;

      // Console.log(relay);
    }

    // SETUP TmpHig, doesn't need board ready as it uses an external plugin
    devices.list.push(tmphig);
    inject[tmphig.uid] = tmphig;

    // Inject board to console
    inject.board = board;

    this.repl.inject(inject);

    ready = true;

  });

module.exports = devices;
