const { ADD_IO, REMOVE_IO, EDIT_IO, SORT_IO, SORT_IO_NO_DRAG, CREATE_IO, UPDATE_IO_OPTIONS } = require('../actions/io'),
    { getSortedFromParent } = require('../util'),
    uid = require('uid'),
    _ = require('lodash');

function io(state = [], action) {

  switch (action.type) {
  case ADD_IO:

    var newState = _.cloneDeep(state);

    const siblings = getSortedFromParent(newState, action.container.id, 'parentId', 'order'),
        io = Object.assign(_.cloneDeep(action.io), {
        parentId: action.container.id,
        id: uid(),
        order: siblings.length,
      });

    newState.push(io);

    return newState;

  case REMOVE_IO:

    var newState = _.cloneDeep(state);

    for (var i = 0; i < newState.length; i++) {
      if (newState[i].id === action.ioId) {
        newState.splice(i, 1);
        break;
      }
    }

    return newState;

  case EDIT_IO:

    var newState = _.cloneDeep(state);
    return newState;

  case SORT_IO:

    var newState = _.cloneDeep(state),
        dragged = _.find(newState, (o) => o.id === action.dragged.id),
        newSiblings = getSortedFromParent(newState, action.to.parentId, 'parentId', 'order');

    // FIX BUG WHERE IO IS IT'S OWN PARENT
    if (action.to.parentId === dragged.id) {
      return newState;
    }

    // MAKE AN EMPTY ORDER NR WHERE THE DRAGGED FITS
    for (var i = 0, cnt = 0; i < newSiblings.length; i++) {
      // MAKE AN EMPTY SPACE
      if (i + cnt === action.to.index) {
        ++cnt;
      }

      if (dragged.id === newSiblings[i].id) {
        --cnt;
      }

      newSiblings[i].order = i + cnt;
    }

    // SET DRAGGED'S PARENT AND INDEX x
    dragged.order = action.to.index;
    dragged.parentId = action.to.parentId;

    if (action.from.parentId !== action.to.parentId) {
      // REORDER PREVIOUS SIBLINGS IF THE PARENT IS DIFFERENT
      var old_siblings = getSortedFromParent(newState, action.from.parentId, 'parentId', 'order');
      for (var i = 0; i < old_siblings.length; i++) {
        old_siblings[i].order = i;
      }
    }

    return newState;

  case SORT_IO_NO_DRAG:

    var newState = _.cloneDeep(state),
        fromIo = _.find(newState, (o) => o.id === action.from.id),
        toIo = _.find(newState, (o) => o.id === action.to.id),
        newSiblings = getSortedFromParent(newState, action.to.parentId, 'parentId', 'order');

    fromIo.parentId = action.to.parentId;

    // Add to empty io-list
    if (action.to.id === null) {
      fromIo.order = 0;
      return newState;
    }

    // MAKE AN EMPTY ORDER NR WHERE THE DRAGGED FITS
    // debugger;
    var found = false;
    for (var i = 0, cnt = 0; i < newSiblings.length; i++) {

      if (newSiblings[i].id === action.from.id) {
        found = true;
        cnt -= 1;
        continue;
      }

      if (newSiblings[i].id === action.to.id) {
        if (found) {
          newSiblings[i].order = i + cnt;
          cnt += 1;
          fromIo.order = i + cnt;
        }else {
          fromIo.order = i + cnt;
          cnt += 1;
          newSiblings[i].order = i + cnt;
        }

        continue;
      }

      newSiblings[i].order = i + cnt;
    }

    return newState;

  case CREATE_IO:

    var newState = _.cloneDeep(state);
    return newState;

  case UPDATE_IO_OPTIONS:

    var newState = _.cloneDeep(state),
        io = _.find(newState, (o) => o.id === action.id);

    io.options = action.options;

    return newState;

  default:
    return state;
}

}

module.exports = io;

