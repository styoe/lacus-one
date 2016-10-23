module.exports = function (input, io, appState, ioSubtypes, devices) {

    if (!input) return 0;

    var val = parseInt(io.options.value),
        type = io.options.type;

    var tmphig = null;

    for (var i = 0; i < devices.list.length; i++) {
      // Console.log(devices.list[i].uid, io.uid);
      if (devices.list[i].uid === 'dht22_system') {
        tmphig = devices.list[i];
        break;
      }
    }

    if (!tmphig) throw Error('tmphig sensor unknown!!!');

    if (type === '>' && parseInt(tmphig.humidity) > parseInt(val)) {
      return true;
    }

    if (type === '<' && parseInt(tmphig.humidity) < parseInt(val)) {
      return true;
    }

    return false;

  };
