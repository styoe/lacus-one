/**
 * Main app state manipulation interface,
 * Change electron-json-storage because it is unreliable
 */

const { APP_STATE, IS_RASPBERRY } = require('../conf'),
    storage = require('electron-json-storage'),
    DHT22 = IS_RASPBERRY ? require('./devices/tmphig') : { temperature: 1, humidity: 1 };

// SET RUNNING APP STATE TO BE RETURNED TO PREVENT ACCESSING THE STATE FROM STORAGE ALL THE TIME
var appState = null;

module.exports = {

    getState: function (cb) {

        return cb(APP_STATE);

        if (appState) {
          return cb(appState);
        }

        storage.has('app-state', function (error, hasKey) {
            if (error) { throw error; }

            if (hasKey) {
              storage.get('app-state', function (error, data) {
                  if (error) { throw error; }

                  appState = data;
                  cb(data);
                });
            } else {
              cb(APP_STATE);
            }
          });

      },

    setState: function (state) {
        storage.set('app-state', state, function (error) {
            if (error) throw error;
            appState = state;
          });
      },

    getAppSensors: function () {
        return {
            temperature: DHT22.temperature,
            humidity: DHT22.humidity,
          };
      },

  };
