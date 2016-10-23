/**
 * Pin test
 * Not for production
 * Just a testing grounds for gpio
 */

const SerialPort = require('serialport'),
    Raspi = require('raspi-io'),
    five = require('johnny-five');

// Const board = new five.Board();
var io = new Raspi();

const board = new five.Board({
    io: io,
  });


var rpiDhtSensor = require('rpi-dht-sensor');
var dht = new rpiDhtSensor.DHT22(2);

function read() {
  var readout = dht.read();

  console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
      'humidity: ' + readout.humidity.toFixed(2) + '%');
  setTimeout(read, 5000);
}

read();

function init() {
  console.log('pls work');

  // SerialPort.list(function (err, ports) {
  //     console.log("thisis the list callback");
  //     console.log(err);
  //
  //     Ports.forEach(function(port) {
  //         console.log(port);
  //         console.log(port.comName);
  //         console.log(port.pnpId);
  //         console.log(port.manufacturer);
  //     });
  // });

  board.on('ready', function () {
      console.log('board ready');

      var relay = new five.Relay({
          type: 'NC',
          pin: 7,
        });

      relay.off();

      // This.i2cConfig();
      // this.i2cRead(0x13, 0x01, function(bytes) {
      //     console.log("Bytes read: ", bytes);
      // });

      //
      // Let bar = new five.Barometer({
      //     controller: "BMP180"
      // });
      // bar.on("data", function() {
      //     console.log("barometer");
      //     console.log("  pressure : ", this.pressure);
      //     console.log("--------------------------------------");
      // });


      // var multi = new five.Multi({
      //     controller: "DHT11_I2C_NANO_BACKPACK",
      //     pin: 2
      // });
      //
      // Multi.on("change", function() {
      //     console.log("temperature");
      //     console.log("  celsius           : ", this.temperature.celsius);
      //     console.log("  fahrenheit        : ", this.temperature.fahrenheit);
      //     console.log("  kelvin            : ", this.temperature.kelvin);
      //     console.log("--------------------------------------");
      //
      //     Console.log("Hygrometer");
      //     console.log("  relative humidity : ", this.hygrometer.relativeHumidity);
      //     console.log("--------------------------------------");
      // });

      this.repl.inject({
          relay: relay,
          // Tmp: tmp,
          board: board,
          // Tmp: tmp,
          // read: read,
          // multi: multi
          // rh: rh,
          // tmp: tmp
        });

    });

}

module.exports = {
    init: init,
  };
