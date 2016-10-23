const { GET_WIFIS, CONNECT_TO_WIFI, SET_LOADING_STATE, UPDATE_APP_SENSORS, UPDATE_APP_DIMENSIONS } = require('../actions/app'),
    _ = require('lodash');

function app(state = {}, action) {

  switch (action.type) {
  case SET_LOADING_STATE:

    var newState = _.cloneDeep(state);
    newState.isLoading = action.isLoading;

    return newState;

  case UPDATE_APP_SENSORS:

    var newState = _.cloneDeep(state);
    newState.temperature = action.data.temperature;
    newState.humidity = action.data.humidity;
    return newState;

  case UPDATE_APP_DIMENSIONS:

    var newState = _.cloneDeep(state);
    newState.width = action.data.width;
    newState.height = action.data.height;
    return newState;

  case GET_WIFIS:

    var newState = _.cloneDeep(state);

    if (action.wifis.length) {
      newState.wifis = action.wifis;
    }else {
      alert('No networks found, try again.');
    }

    return newState;

  case CONNECT_TO_WIFI:

    var newState = _.cloneDeep(state);

    if (action.result.success) {
      alert('success');
    }else {
      alert('Wifi scanning error. Try again!');
    }

    console.log(action.result);

    return newState;

  default:
    return state;

  }// jscs:ignore validateIndentation

}

module.exports = app;
