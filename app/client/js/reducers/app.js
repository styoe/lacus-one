const { GET_WIFIS, CONNECT_TO_WIFI, SET_LOADING_STATE, UPDATE_APP_SENSORS, UPDATE_APP_DIMENSIONS } = require('../actions/app'),
    _ = require('lodash');

function app(state = {}, action) {

    switch (action.type) {
        case SET_LOADING_STATE:

            var new_state = _.cloneDeep(state);
            new_state.is_loading = action.is_loading;

            return new_state;

        case UPDATE_APP_SENSORS:

            var new_state = _.cloneDeep(state);
            new_state.temperature = action.data.temperature;
            new_state.humidity = action.data.humidity;
            return new_state;

        case UPDATE_APP_DIMENSIONS:

            var new_state = _.cloneDeep(state);
            new_state.width = action.data.width;
            new_state.height = action.data.height;
            return new_state;

        case GET_WIFIS:

            var new_state = _.cloneDeep(state);

            if(action.wifis.success){
                new_state.wifis = action.wifis.networks;
            }else{
                alert('Wifi scanning error. Try again!');
            }

            return new_state;

        case CONNECT_TO_WIFI:

            var new_state = _.cloneDeep(state);

            if(action.result.success){
                alert('success');
            }else{
                alert('Wifi scanning error. Try again!');
            }

            console.log(action.result);

            return new_state;


        default:
            return state
    }

}

module.exports = app;