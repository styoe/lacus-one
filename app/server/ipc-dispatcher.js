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
        WiFiControl = require('wifi-control');

WiFiControl.init({
    debug: true,
    connectionTimeout: 20000
});

let initialized = false;

const init = function() {

    if(initialized){ return false; }
    initialized = true;

    ipcMain.on('get-server-ip', function(event, arg) {
        event.sender.send('server-ip', ips[0]);
    });

    ipcMain.on('get-app-state', function(event) {
        state.getState((data) => event.returnValue=data);
    });

    ipcMain.on('update-app-state', function(event, arg) {
        state.setState(arg);
    });

    ipcMain.on('get-app-sensors', function(event, arg) {
        event.returnValue = state.getAppSensors();
    });


    // WIFI
    ipcMain.on('get-app-wifis', function(event, arg) {

        //  Try scanning for access points:
        WiFiControl.scanForWiFi( function(err, response) {
            if (err) console.log(err);
            event.returnValue = response;
            console.log(response);
        });


    });

    ipcMain.on('connect-app-to-wifi', function(event, arg) {

        WiFiControl.init({
            debug: true
        });

        var wifi= {
            ssid: arg.wifi.ssid,
            password: arg.password
        }

        try{
            var results = WiFiControl.connectToAP( wifi, function(err, response) {
                if (err) console.log(err);
                event.returnValue = results;
                console.log(response);
            });
        }
        catch(err){
            console.log(err);
            event.returnValue = {
                success: false,
                message: err
            };
        }
    });


    // DISABLE THIS LATERS
    ipcMain.on('minimize', function(event, arg) {
        app.minimize();
      });

    ipcMain.on('quit', function(event, arg) {
        app.quit();
      });

  };



module.exports = {
    init:init,
    isInitialized: function() {
        return initialized;
    },
};

