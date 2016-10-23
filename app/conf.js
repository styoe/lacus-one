/**
 * Main app config
 */
'use strict';

const config = {
    PORT: 8100,
    WINDOW_SIZE: {
        w: 800,
        h: 450,
      },
    FRAME: false,
    KIOSK: false,
    SPLASH: 'file://' + __dirname + '/client/index.html',
    TRAY_ICON: __dirname + '/assets/img/tray.png',
    DEFAULT_PATH: 'Kliknite i odaberite direktorij',
    DEBUG: true,
    IS_RASPBERRY: false,
    DEVICE_UPDATE_INTERVAL: 2000,
    RELAYS_CONFIG: [
        {
            uid: 'relay_1_system',
            hardware: {
                type: 'NC',
                pin: 1,
              },
          },
        {
            uid: 'relay_2_system',
            hardware: {
                type: 'NC',
                pin: 0,
              },
          },
        {
            uid: 'relay_3_system',
            hardware: {
                type: 'NC',
                pin: 2,
              },
          },
        {
            uid: 'relay_4_system',
            hardware: {
                type: 'NC',
                pin: 3,
              },
          },
    ],
    TMPHIG_CONFIG: {
        uid: 'dht22_system',
        pin: 24,
        interval: 2000,
      },
    APP_STATE: {
        app: {
            isLoading: false,
            temperature: 0,
            humidity: 0,
            wifis: [],
          },
        ioLib: [
            {
                name: 'Relay 1',
                type: 'relay',
                subtype: 'relay',
                uid: 'relay_1_system',
                options: {},
              },
            {
                name: 'Relay 2',
                type: 'relay',
                subtype: 'relay',
                uid: 'relay_2_system',
                options: {},
              },
            {
                name: 'Relay 3',
                type: 'relay',
                subtype: 'relay',
                uid: 'relay_3_system',
                options: {},
              },
            {
                name: 'Relay 4',
                type: 'relay',
                subtype: 'relay',
                uid: 'relay_4_system',
                options: {},
              },
            {
                name: 'Temperature',
                type: 'temperature',
                subtype: 'temperature',
                uid: 'temperature_system',
                options: {
                    value: 0,
                    type: '<',
                  },
              },
            {
                name: 'Humidity',
                type: 'humidity',
                subtype: 'humidity',
                uid: 'humidity_system',
                options: {
                    value: 0,
                    type: '<',
                  },
              },
            {
                name: 'Time range',
                type: 'timerange',
                subtype: 'timerange',
                options: {
                    start: {
                        h: '00',
                        m: '00',
                      },
                    end: {
                        h: '00',
                        m: '00',
                      },
                  },
              },
            {
                name: 'AND',
                type: 'gate',
                subtype: 'and',
              },
            {
                name: 'OR',
                type: 'gate',
                subtype: 'or',
              },

        ],
        components: [],
        io: [],
        modals: [],
      },
  };

module.exports = config;
