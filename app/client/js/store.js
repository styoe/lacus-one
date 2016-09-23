const { createStore, applyMiddleware } = require('redux'),
    CONF = require('../conf'),
    logger = require('redux-logger'),
    {UPDATE_APP_SENSORS, UPDATE_APP_DIMENSIONS} = require('./actions/app'),
    allReducers = require('./reducers/all'),
    {saveAppStateSubscription, getAppState, getAppSensors} = CONF.IS_ELECTRON ? require('./ipc') : require('./http');

let initialData = getAppState();
initialData.modals = [];

const middleware = [];

if( CONF.DEBUG ){
    middleware.push(logger());
}

let store = createStore(
    allReducers,
    initialData,
    applyMiddleware(
        ...middleware
    )
);

store.subscribe(saveAppStateSubscription.bind(store));


// GET SENSORS INFORMATION EVERY 2s
const sensorsInterval = function(){
    const data = getAppSensors();
    store.dispatch({ type: UPDATE_APP_SENSORS, data: data });
}
setInterval(sensorsInterval, CONF.UPDATE_SENSORS_INTERVAL);


// GET WINDOWS SIZE INITIALLY AND ON RESIZE
const getWindowSize = function(){
    const data = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    store.dispatch({ type: UPDATE_APP_DIMENSIONS, data: data });
};
getWindowSize();
window.onresize = getWindowSize;


module.exports = store;


// You may optionally specify the initial state as
// the second argument to createStore().
// This is useful for hydrating the state of the client
// to match the state of a Redux application running on the server.
//
// let store = createStore(todoApp, window.STATE_FROM_SERVER)