const {IS_RASPBERRY, DEVICE_UPDATE_INTERVAL} = require('../conf'),
    state = require('./state'),
    getIoByParent = require('./io/getIoByParent'),
    devices = IS_RASPBERRY ? require('./devices') : {
        list: [
            {
                uid: 'relay_1_system',
                on: function(){
                    // console.log('relay on!');
                    return 1;
                },
                off: function(){
                    // console.log('relay off!');
                    return 0;
                },
                state: 0,
                resolve: function(){
                    return true;
                }
            }
        ],
        isReady: true
    },
    io_subtypes = {
        and: require('./io/and'),
        or: require('./io/or'),
        relay: require('./io/relay'),
        timerange: require('./io/timerange'),
        temperature: require('./io/temperature'),
        humidity: require('./io/humidity')
    };


function resolveComponent(component, appState){
    const component_children = getIoByParent(appState.io, component.id);

    let input = component.active;

    for(const io of component_children){
        // console.log('start io: ' + io.name+ ' ' + io.subtype);
        // console.log( io_subtypes );

        input = io_subtypes[io.subtype]( input, io, appState, io_subtypes, devices );
    }

}


function resolveState(appState){
    if(!devices.isReady) return;
    
    for(let component of appState.components){
        resolveComponent(component, appState)
    }

    for(var i=0; i<devices.list.length; i++){
        devices.list[i].resolve();
    }
    
}


function getState(){
    state.getState(resolveState);
}


function init(){
    setInterval(getState, DEVICE_UPDATE_INTERVAL);
}


module.exports = {
    init: init
};