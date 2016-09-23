module.exports = function( input, io, appState, io_subtypes, devices ){

    if( !input ) return 0;

    var val = parseInt(io.options.value),
        type = io.options.type;

    var tmphig = null;

    for(var i=0; i<devices.list.length; i++){
        // console.log(devices.list[i].uid, io.uid);
        if(devices.list[i].uid === 'dht22_system'){
            tmphig = devices.list[i];
            break;
        }
    }

    if(!tmphig) throw Error('tmphig sensor unknown!!!');

    if ( type === '>' && tmphig.temperature > val ){
        return 1;
    }

    if ( type === '<' && tmphig.temperature < val ){
        return 1;
    }

    return 0

}