"use strict";
// Handle windows updateing

// Start app
const   server = require('./server/server'),
    io = require('./server/io'),
    ipcDispatcher = require('./server/ipc-dispatcher'),
    app = require('./app'),
    tray = require('./utils/tray');


server.init();

app.init({
    onReady: function() {
        tray.init();
        ipcDispatcher.init();
        io.init();
    }
});


// const pintest = require('./server/pin-test');
// pintest.init();





