const getIoByParent = require('./getIoByParent');

module.exports = function( input, io, appState, io_subtypes, devices ){
    var children = getIoByParent(appState.io, io.id),
        output = false;

    for(const child of children){
        output = io_subtypes[child.subtype]( input, child, appState, io_subtypes, devices ) || output;
    }

    return output;
}