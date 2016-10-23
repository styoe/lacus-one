/**
 * MAIN tray file
 * handles all tray icon interactions and setup
 * does not export tray instance
 */

'use strict';

const   { TRAY_ICON } = require('../conf'),
        { Tray, Menu } = require('electron'),
        app = require('../app');

let initialized = false;
const init = function () {

    if (initialized) { return false; }

    initialized = true;

    const appIcon = new Tray(TRAY_ICON);

    appIcon.on('click', function (e, bounds) {
        app.focus();
      });

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show',
            click: function () {
                app.focus();
              },
          },
        {
            label: 'Quit',
            click: function () {
                app.quit();
              },
          },
    ]);

    appIcon.setToolTip('inCheckin');
    appIcon.setContextMenu(contextMenu);
  };

module.exports = {
    init: init,
    isInitialized: function () {
        return initialized;
      },
  };
