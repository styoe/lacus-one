const { GET_IO_FROM_LIB } = require('../actions/io-lib');

function getIoFromLib(state = [], action) {

    switch (action.type) {
        case GET_IO_FROM_LIB:

            var new_state = Object.assign([], state);

            var component = Object.assign({}, action.component)
            new_state.push( component );

            return new_state;

        default:
            return state
    }

}

module.exports = getIoFromLib;