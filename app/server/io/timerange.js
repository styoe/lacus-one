module.exports = function( input, io, appState, io_subtypes, devices ){

    if( !input ) return 0;

    var now = Date.now(),
        start = new Date(),
        end = new Date();

    start.setHours(parseInt(io.options.start.h));
    start.setMinutes(parseInt(io.options.start.m));
    end.setHours(parseInt(io.options.end.h));
    end.setMinutes(parseInt(io.options.end.m));

    if(start.getTime() < now && end.getTime() > now) {
        return true;
    }else{
        return false;
    }

}