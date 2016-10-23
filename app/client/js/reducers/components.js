const { ADD_COMPONENT, REMOVE_COMPONENT, TOGGLE_COMPONENT, EDIT_COMPONENT, UPDATE_COMPONENT, SORT_COMPONENTS } = require('../actions/components'),
    _ = require('lodash');

function components(state = [], action) {

  switch (action.type) {
  case ADD_COMPONENT:

    var newState = _.cloneDeep(state);

    var component = Object.assign({}, action.component);
    newState.push(component);

    return newState;

  case REMOVE_COMPONENT:

    var newState = _.cloneDeep(state);

    for (var i = 0; i < newState.length; i++) {
      if (newState[i].id === action.componentId) {
        newState.splice(i, 1);
        break;
      }
    }

    return newState;

  case TOGGLE_COMPONENT:

    var newState = _.cloneDeep(state);

    for (var i = 0; i < newState.length; i++) {
      if (newState[i].id === action.componentId) {
        newState[i].active = !newState[i].active;
        break;
      }
    }

    return newState;

  case EDIT_COMPONENT:

    var newState = _.cloneDeep(state);

    for (var i = 0; i < newState.length; i++) {
      if (newState[i].id === action.componentId) {
        console.log('edit ' + newState[i]);
        break;
      }
    }

    return newState;

  case UPDATE_COMPONENT:

    var newState = _.cloneDeep(state);

    for (var i = 0; i < newState.length; i++) {
      if (newState[i].id === action.componentId) {
        newState[i].name = action.componentName;
      }
    }

    return newState;

  case SORT_COMPONENTS:

    var newState = _.cloneDeep(state),
        component = newState.splice(action.from, 1);

    newState.splice(action.to, 0, component[0]);

    return newState;

  default:
    return state;
  }// jscs:ignore validateIndentation

}

module.exports = components;
