/*
* The relay component
*/

const five = require('johnny-five');

function init(conf) {

  let relay = new five.Relay({
      type: 'NC',
      pin: conf.hardware.pin,
    });

  relay.off();

  return {
      uid: conf.uid,

      on: function () {
          relay.on();
          this.state = 1;
        },

      off: function () {
          relay.off();
          this.state = 0;
        },

      state: 0,

      resolve: function () {
          if (this.state) {
            this.on();
          }else {
            this.off();
          }

        },
    };
}

module.exports = init;
