const uid = require('uid');

const ADD_COMPONENT = 'ADD_COMPONENT',
    REMOVE_COMPONENT = 'REMOVE_COMPONENT',
    TOGGLE_COMPONENT = 'TOGGLE_COMPONENT',
    EDIT_COMPONENT = 'EDIT_COMPONENT',
    UPDATE_COMPONENT = 'UPDATE_COMPONENT',
    SORT_COMPONENTS = 'SORT_COMPONENTS';

function addComponent() {
  var component = {
      id: uid(),
      name: 'Nova komponenta',
      active: true,
    };

  return {
      type: ADD_COMPONENT,
      component: component,
    };
}

function removeComponent(id) {
  return {
      type: REMOVE_COMPONENT,
      componentId: id,
    };
}

function toggleComponent(id) {
  return {
      type: TOGGLE_COMPONENT,
      componentId: id,
    };
}

function editComponent(id) {
  return {
      type: EDIT_COMPONENT,
      componentId: id,
    };
}

function updateComponent(id, name) {
  return {
      type: UPDATE_COMPONENT,
      componentId: id,
      componentName: name,
    };
}

function sortComponents(from, to) {
  return {
      type: SORT_COMPONENTS,
      from: from,
      to: to,
    };
}

module.exports = {
    ADD_COMPONENT: ADD_COMPONENT,
    REMOVE_COMPONENT: REMOVE_COMPONENT,
    TOGGLE_COMPONENT: TOGGLE_COMPONENT,
    EDIT_COMPONENT: EDIT_COMPONENT,
    UPDATE_COMPONENT: UPDATE_COMPONENT,
    SORT_COMPONENTS: SORT_COMPONENTS,
    addComponent: addComponent,
    removeComponent: removeComponent,
    toggleComponent: toggleComponent,
    editComponent: editComponent,
    updateComponent: updateComponent,
    sortComponents: sortComponents,
  };
