/**
 * MAIN app file
 */
'use strict';

const { WINDOW_SIZE, SPLASH, KIOSK, FRAME, DEBUG } = require('./conf'),
        electron = require('electron'),
        BrowserWindow = electron.BrowserWindow,
        app = {};

const init = function (options) {
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.

    if (app.instance) {
      throw Error('App is already initialized');
    }

    app.mainWindow = {};

    // Module to control application life.
    app.instance = electron.app;

    app.instance.on('ready', onReady);
    if (typeof options.onReady === 'function') {
      app.instance.on('ready', options.onReady);
    }

    app.instance.on('window-all-closed', onAllClosed);

    app.instance.on('activate', onActivate);

  };

const onReady = function () {

    // Close this instance in case another instance is starting
    app.instance.makeSingleInstance(function () {
        app.quit();
      });

    // Create the browser window.
    app.mainWindow = new BrowserWindow({
        width: WINDOW_SIZE.w,
        height: WINDOW_SIZE.h,
        skipTaskbar: true,
        autoHideMenuBar: true,
        frame: FRAME,
        kiosk: KIOSK,
      });

    // And load the index.html of the app.
    app.mainWindow.loadURL(SPLASH);

    // Open the DevTools.
    if (DEBUG) {
      app.mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    app.mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        app.mainWindow = null;
      });

  };

const onAllClosed = function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.instance.quit();
    }
  };

const onActivate = function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (app.mainWindow === null){
    //    CreateWindow();
    // }
  };

const focus = function () {
    app.mainWindow.show();
    app.mainWindow.focus();
  };

const minimize = function () {
    app.mainWindow.minimize();
  };

const quit = function () {
    app.instance.quit();
  };

module.exports = {
    init: init,
    focus: focus,
    minimize: minimize,
    quit: quit,
  };
