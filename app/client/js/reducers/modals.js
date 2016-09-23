const { OPEN_MODAL, CLOSE_MODAL } = require('../actions/modals'),
    _ = require('lodash');;


function modals(state = [], action) {

    switch (action.type) {
        case OPEN_MODAL:

            var new_state = Object.assign([], _.cloneDeep(state)),
                data = Object.assign({}, _.cloneDeep(action.modal));

            new_state.push( data );

            return new_state;


        case CLOSE_MODAL:

            var new_state = Object.assign([], _.cloneDeep(state));

            for( var i = 0; i < new_state.length; i++ ){
                if( new_state[i].id === action.id ){
                    new_state.splice( i, 1 );
                    break;
                }
            }

            return new_state;


        default:
            return state
    }

}

module.exports = modals;