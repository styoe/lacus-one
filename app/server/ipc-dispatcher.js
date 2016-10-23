/**
 * MAIN Ipc dispatcher
 */
'use strict';

const   electron = require('electron'),
        ipcMain = electron.ipcMain,
        app = require('../app'),
        ipProvider = require('../utils/ip-provider'),
        ips = ipProvider.getIps(),
        state = require('./state'),
        wifi = require('../wifi');

const init = function () {

    ipcMain.on('get-server-ip', function (event, arg) {
        event.sender.send('server-ip', ips[0]);
      });

    ipcMain.on('get-app-state', function (event) {
        state.getState((data) => event.returnValue = data);
      });

    ipcMain.on('update-app-state', function (event, arg) {
        state.setState(arg);
      });

    ipcMain.on('get-app-sensors', function (event, arg) {
        event.returnValue = state.getAppSensors();
      });

    // WIFI
    ipcMain.on('get-app-wifis', function (event, arg) {

        wifi.scan((response)=> {
            console.log(response, 'response');
            event.returnValue = response;
          });

      });

    ipcMain.on('connect-app-to-wifi', function (event, arg) {
        console.log(arg, 'arg');
        wifi.connect(arg, (response)=> {
          console.log(response, 'response from connect');
          event.returnValue = response;
        });
      });

    // DISABLE THIS LATERS
    ipcMain.on('minimize', function (event, arg) {
        app.minimize();
      });

    ipcMain.on('quit', function (event, arg) {
        app.quit();
      });

  };

module.exports = {
    init: init,
  };

