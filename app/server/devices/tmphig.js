/*
* The tmphigh component
*/

const rpiDhtSensor = require('rpi-dht-sensor'),
    TMPHIG_CONF = require('../../conf').TMPHIG_CONFIG,
    DHT22 = new rpiDhtSensor.DHT22(TMPHIG_CONF.pin);

const sensor = {
    uid: TMPHIG_CONF.uid,

    on: function () {
        return 1;
      },

    off: function () {
        return 0;
      },

    temperature: 0,

    humidity: 0,

    resolve: function () {
        return false;
      },
  };

function read() {
  let readout = DHT22.read();
  sensor.temperature = readout.temperature.toFixed(2);
  sensor.humidity = readout.humidity.toFixed(2);
  setTimeout(read, TMPHIG_CONF.interval);
}

read();

module.exports = sensor;
