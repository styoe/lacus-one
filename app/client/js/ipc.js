const { setLoadingState } = require('./actions/app');

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

function saveAppStateSubscription( data ) {
    var state = this.getState();
    ipcRenderer.send('update-app-state', state);
}

function getAppState(){
    return ipcRenderer.sendSync('get-app-state');
}

function getAppSensors(){
    return ipcRenderer.sendSync('get-app-sensors');
}

function getAppWifis(){
    return ipcRenderer.sendSync('get-app-wifis');
}

function connectAppToWifi(wifi){
    return ipcRenderer.sendSync('connect-app-to-wifi', wifi);
}

module.exports = {
    getAppState: getAppState,
    saveAppStateSubscription: saveAppStateSubscription,
    getAppSensors: getAppSensors,
    getAppWifis: getAppWifis,
    connectAppToWifi: connectAppToWifi
};