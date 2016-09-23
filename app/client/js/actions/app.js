const SET_LOADING_STATE = 'SET_LOADING_STATE',
    SAVE_APP_STATE = 'SAVE_APP_STATE',
    UPDATE_APP_SENSORS = 'UPDATE_APP_SENSORS',
    UPDATE_APP_DIMENSIONS = 'UPDATE_APP_DIMENSIONS',
    GET_WIFIS = 'GET_WIFIS',
    CONNECT_TO_WIFI = 'CONNECT_TO_WIFI',
    CONF = require('../../conf'),
    {getAppWifis, connectAppToWifi} = CONF.IS_ELECTRON ? require('../ipc') : require('../http');


function setLoadingState(is_loading) {
    return {
        type: SET_LOADING_STATE,
        is_loading: is_loading
    }
}


const updateAppSensors = function(data){
    return{
        type: UPDATE_APP_SENSORS,
        data: data
    }
}


const updateAppDimensions = function(data){
    return{
        type: UPDATE_APP_DIMENSIONS,
        data: data
    }
}


const getWifis = function(){
    const wifis = getAppWifis();

    return{
        type: GET_WIFIS,
        wifis: wifis
    }
}

const connectToWifi = function (wifi){

    console.log('connectToWifi action'); 

    const result = connectAppToWifi(wifi);

    return{
        type: CONNECT_TO_WIFI,
        result: result
    }

}


module.exports = {
    SET_LOADING_STATE: SET_LOADING_STATE,
    UPDATE_APP_SENSORS: UPDATE_APP_SENSORS,
    UPDATE_APP_DIMENSIONS: UPDATE_APP_DIMENSIONS,
    GET_WIFIS: GET_WIFIS,
    CONNECT_TO_WIFI: CONNECT_TO_WIFI,
    setLoadingState: setLoadingState,
    updateAppSensors: updateAppSensors,
    updateAppDimensions: updateAppDimensions,
    getWifis: getWifis,
    connectToWifi: connectToWifi
};