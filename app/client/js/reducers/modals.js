const { OPEN_MODAL, CLOSE_MODAL } = require('../actions/modals'),
    _ = require('lodash');

function modals(state = [], action) {

  switch (action.type) {
  case OPEN_MODAL:

    var newState = Object.assign([], _.cloneDeep(state)),
        data = Object.assign({}, _.cloneDeep(action.modal));

    newState.push(data);

    return newState;

  case CLOSE_MODAL:

    var newState = Object.assign([], _.cloneDeep(state));

    for (var i = 0; i < newState.length; i++) {
      if (newState[i].id === action.id) {
        newState.splice(i, 1);
        break;
      }
    }

    return newState;

  default:
    return state;
}

}

module.exports = modals;
