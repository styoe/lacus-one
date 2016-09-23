const { combineReducers } = require('redux'),
        components = require('./components'),
        modals = require('./modals'),
        app = require('./app'),
        io_lib = require('./io-lib'),
        io = require('./io');


const allReducers = combineReducers({
    app,
    io_lib,
    io,
    components,
    modals
});


module.exports = allReducers;