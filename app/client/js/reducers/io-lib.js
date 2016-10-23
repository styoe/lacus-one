const { GET_IO_FROM_LIB } = require('../actions/io-lib');

function getIoFromLib(state = [], action) {

  switch (action.type) {
  case GET_IO_FROM_LIB:

    var newState = Object.assign([], state);

    var component = Object.assign({}, action.component);
    newState.push(component);

    return newState;

  default:
    return state;
  }// jscs:ignore validateIndentation

}

module.exports = getIoFromLib;
