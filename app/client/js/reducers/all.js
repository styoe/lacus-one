const { combineReducers } = require('redux'),
        components = require('./components'),
        modals = require('./modals'),
        app = require('./app'),
        ioLib = require('./io-lib'),
        io = require('./io');

const allReducers = combineReducers({
    app,
    ioLib,
    io,
    components,
    modals,
  });

module.exports = allReducers;
