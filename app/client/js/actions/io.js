const uid = require('uid');

const ADD_IO = 'ADD_IO',
    REMOVE_IO = 'REMOVE_IO',
    EDIT_IO = 'EDIT_IO',
    SORT_IO = 'SORT_IO',
    SORT_IO_NO_DRAG = 'SORT_IO_NO_DRAG',
    CREATE_IO = 'CREATE_IO',
    UPDATE_IO_OPTIONS = 'UPDATE_IO_OPTIONS';


function addIO(io, container) {
    return {
        type: ADD_IO,
        container: container,
        io: io
    }
}


function removeIO(id) {
    return {
        type: REMOVE_IO,
        IO_id: id
    }
}


function editIO(id) {
    return {
        type: EDIT_IO,
        IO_id: id
    }
}


function sortIO(dragged, from, to) {
    return {
        type: SORT_IO,
        dragged: dragged,
        from: from,
        to: to
    }
}

function sortIoNoDrag(from, to) {
    return {
        type: SORT_IO_NO_DRAG,
        from: from,
        to: to
    }
}


function createIO(){
    return {
        type: CREATE_IO
    }
}


function updateIOOptions(id, options){
    console.log('update io', id, options);
    return{
        type: UPDATE_IO_OPTIONS,
        id: id,
        options: options
    }
}

module.exports = {
    ADD_IO: ADD_IO,
    REMOVE_IO: REMOVE_IO,
    EDIT_IO: EDIT_IO,
    SORT_IO: SORT_IO,
    SORT_IO_NO_DRAG: SORT_IO_NO_DRAG,
    CREATE_IO: CREATE_IO,
    UPDATE_IO_OPTIONS: UPDATE_IO_OPTIONS,
    addIO: addIO,
    removeIO: removeIO,
    editIO: editIO,
    sortIO: sortIO,
    sortIoNoDrag: sortIoNoDrag,
    createIO: createIO,
    updateIOOptions: updateIOOptions
};