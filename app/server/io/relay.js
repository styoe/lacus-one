module.exports = function( input, io, appState, io_subtypes, devices ){

    // console.log(devices.list, io);
    var relay = null;

    for(var i=0; i<devices.list.length; i++){
        // console.log(devices.list[i].uid, io.uid);
        if(devices.list[i].uid === io.uid){
            relay = devices.list[i];
            break;
        }
    }

    // var relay = devices.list.reduce((acc, i) => io.uid===i.uid ? i : null, null);
    if(!relay) throw Error('Relay unknown!!!');

    if(input){
        relay.state = 1;
    }else{
        relay.state = 0;
    }

    return input;
}