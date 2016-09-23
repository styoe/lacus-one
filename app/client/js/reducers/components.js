const { ADD_COMPONENT, REMOVE_COMPONENT, TOGGLE_COMPONENT, EDIT_COMPONENT, UPDATE_COMPONENT, SORT_COMPONENTS,
    addComponent, removeComponent, toggleComponent, editComponent, updateComponent, sortComponents } = require('../actions/components'),
    _ = require('lodash');


function components(state = [], action) {

    switch (action.type) {
        case ADD_COMPONENT:

            var new_state = _.cloneDeep(state);

            var component = Object.assign({}, action.component)
            new_state.push( component );

            return new_state;


        case REMOVE_COMPONENT:

            var new_state = _.cloneDeep(state);

            for( var i = 0; i < new_state.length; i++ ){
                if( new_state[i].id === action.component_id ){
                    new_state.splice( i, 1 );
                    break;
                }
            }

            return new_state;


        case TOGGLE_COMPONENT:

            var new_state = _.cloneDeep(state);

            for( var i = 0; i < new_state.length; i++ ){
                if( new_state[i].id === action.component_id ){
                    new_state[i].active = !new_state[i].active;
                    break;
                }
            }

            return new_state;


        case EDIT_COMPONENT:

            var new_state = _.cloneDeep(state);

            for( var i = 0; i < new_state.length; i++ ){
                if( new_state[i].id === action.component_id ){
                    console.log('edit ' + new_state[i]);
                    break;
                }
            }

            return new_state;


        case UPDATE_COMPONENT:

            var new_state = _.cloneDeep(state);

            for( var i = 0; i < new_state.length; i++ ){
                if( new_state[i].id === action.component_id ){
                    new_state[i].name = action.component_name; 
                }
            }

            return new_state;


        case SORT_COMPONENTS:

            var new_state = _.cloneDeep(state), 
                component = new_state.splice(action.from, 1);

            new_state.splice(action.to, 0, component[0]);

            return new_state;


        default:
            return state
    }

}

module.exports = components;