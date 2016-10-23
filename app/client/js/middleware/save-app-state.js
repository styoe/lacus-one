const { setLoadingState } = require('../actions/app');

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

function saveAppStateMiddleware(data) {
  var state = this.getState();
  ipcRenderer.send('update-app-state', state);
}

module.exports = saveAppStateMiddleware;
