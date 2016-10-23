const uid = require('uid');

const GET_IO_FROM_LIB = 'GET_IO_FROM_LIB',
    OPEN_IO_LIB = 'OPEN_IO_LIB';

function openIoLib(data) {
  return {
      type: GET_IO_FROM_LIB,
      data: data,
    };
}

function getIoFromLib(id) {
  return {
      type: GET_IO_FROM_LIB,
      id: id,
    };
}

module.exports = {
    GET_IO_FROM_LIB: GET_IO_FROM_LIB,
    OPEN_IO_LIB: OPEN_IO_LIB,
    getIoFromLib: getIoFromLib,
    openIoLib: openIoLib,
  };
