module.exports = function (input, io, appState, ioSubtypes, devices) {

    // Console.log(devices.list, io);
    var relay = null;

    for (var i = 0; i < devices.list.length; i++) {
      // Console.log(devices.list[i].uid, io.uid);
      if (devices.list[i].uid === io.uid) {
        relay = devices.list[i];
        break;
      }
    }

    // Var relay = devices.list.reduce((acc, i) => io.uid===i.uid ? i : null, null);
    if (!relay) throw Error('Relay unknown!!!');

    if (input) {
      relay.state = 1;
    }else {
      relay.state = 0;
    }

    return input;
  };
