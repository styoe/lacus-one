/**
 * MAIN app file
 */
'use strict';

const   {WINDOW_SIZE, SPLASH, KIOSK, FRAME, DEBUG} = require('./conf'),
        electron = require('electron'),
        BrowserWindow = electron.BrowserWindow,
        _app = {};


const init = function(options) {
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.

    if (_app.instance) {
      return false;
    }

    _app.mainWindow = {};

    // Module to control application life.
    _app.instance = electron.app;

    _app.instance.on('ready', onReady);
    if (typeof options.onReady === 'function') {
      _app.instance.on('ready', options.onReady);
    }

    _app.instance.on('window-all-closed', onAllClosed);

    _app.instance.on('activate', onActivate);

  };


const onReady = function() {

    // Close this instance in case another instance is starting
    _app.instance.makeSingleInstance(function() {
        _app.quit();
      });

    // Create the browser window.
    _app.mainWindow = new BrowserWindow({
        width: WINDOW_SIZE.w,
        height: WINDOW_SIZE.h,
        skipTaskbar: true,
        autoHideMenuBar: true,
        frame: FRAME,
        kiosk: KIOSK,
      });

    // And load the index.html of the app.
    _app.mainWindow.loadURL(SPLASH);

    // Open the DevTools.
    if (DEBUG) {
      _app.mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    _app.mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        _app.mainWindow = null;
      });

  };


const onAllClosed = function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      _app.instance.quit();
    }
  };


const onActivate = function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (_app.mainWindow === null){
    //    CreateWindow();
    // }
  };


const focus = function() {
    _app.mainWindow.show();
    _app.mainWindow.focus();
  };


const minimize = function() {
    _app.mainWindow.minimize();
  };


const quit = function() {
    _app.instance.quit();
  };


module.exports = {
    init: init,
    focus: focus,
    minimize: minimize,
    quit: quit,
  };