const { setLoadingState } = require('./actions/app');

function saveAppStateSubscription( data ) {
    var state = this.getState();
}

function getAppState(){
    return {};
}

function getAppSensors(){
    return {};
}

module.exports = {
    getAppState: getAppState,
    saveAppStateSubscription: saveAppStateSubscription,
    getAppSensors: getAppSensors
};