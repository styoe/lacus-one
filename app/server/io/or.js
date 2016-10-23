const getIoByParent = require('./getIoByParent');

module.exports = function (input, io, appState, ioSubtypes, devices) {
    let children = getIoByParent(appState.io, io.id),
        output = false;

    for (const child of children) {
      output = ioSubtypes[child.subtype](input, child, appState, ioSubtypes, devices) || output;
    }

    return output;
  };
