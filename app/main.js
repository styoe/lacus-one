'use strict'

// App entry point

// Start app
const   server = require('./server/server'),
    io = require('./server/io'),
    ipcDispatcher = require('./server/ipc-dispatcher'),
    app = require('./app'),
    tray = require('./utils/tray'),
    wifi = require('./wifi');

// wifi.init();
server.init();

app.init({
    onReady: function () {
        tray.init();
        ipcDispatcher.init();
        io.init();
      },
  });

