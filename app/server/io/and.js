const getIoByParent = require('./getIoByParent');

module.exports = function (input, io, appState, ioSubtypes, devices) {

    var children = getIoByParent(appState.io, io.id),
        output = true;

    for (const child of children) {
      output = ioSubtypes[child.subtype](input, io, appState, ioSubtypes, devices) && output;
    }

    return output;
  };
