const {ADD_IO, REMOVE_IO, EDIT_IO, SORT_IO, SORT_IO_NO_DRAG, CREATE_IO, UPDATE_IO_OPTIONS} = require('../actions/io'),
    {getSortedFromParent} = require('../util'),
    uid = require('uid'),
    _ = require('lodash');

function io(state = [], action) {

    switch (action.type) {
        case ADD_IO:

            var new_state = _.cloneDeep(state);

            const siblings = getSortedFromParent(new_state, action.container.id, 'parent_id', 'order'),
                io = Object.assign(_.cloneDeep(action.io), {
                parent_id: action.container.id,
                id: uid(),
                order: siblings.length
            });

            new_state.push(io); 

            return new_state;


        case REMOVE_IO:

            var new_state = _.cloneDeep(state);

            for (var i = 0; i < new_state.length; i++) {
                if (new_state[i].id === action.IO_id) {
                    new_state.splice(i, 1);
                    break;
                }
            }

            return new_state;


        case EDIT_IO:

            var new_state = _.cloneDeep(state);
            return new_state;


        case SORT_IO:

            var new_state = _.cloneDeep(state),
                dragged = _.find(new_state, (o) => o.id === action.dragged.id),
                new_siblings = getSortedFromParent(new_state, action.to.parent_id, 'parent_id', 'order');

            // FIX BUG WHERE IO IS IT'S OWN PARENT
            if(action.to.parent_id === dragged.id){
                return new_state;
            }

            // MAKE AN EMPTY ORDER NR WHERE THE DRAGGED FITS
            for (var i = 0, cnt = 0; i < new_siblings.length; i++) {
                // MAKE AN EMPTY SPACE
                if (i + cnt === action.to.index) {
                    ++cnt;
                }

                if (dragged.id === new_siblings[i].id) {
                    --cnt;
                }

                new_siblings[i].order = i + cnt;
            }

            // SET DRAGGED'S PARENT AND INDEX x
            dragged.order = action.to.index;
            dragged.parent_id = action.to.parent_id;

            if (action.from.parent_id !== action.to.parent_id) {
                // REORDER PREVIOUS SIBLINGS IF THE PARENT IS DIFFERENT
                var old_siblings = getSortedFromParent(new_state, action.from.parent_id, 'parent_id', 'order');
                for (var i = 0; i < old_siblings.length; i++) {
                    old_siblings[i].order = i;
                }
            }

            return new_state;


        case SORT_IO_NO_DRAG:

            var new_state = _.cloneDeep(state),
                from_io = _.find(new_state, (o) => o.id === action.from.id),
                to_io = _.find(new_state, (o) => o.id === action.to.id),
                new_siblings = getSortedFromParent(new_state, action.to.parent_id, 'parent_id', 'order');

            from_io.parent_id= action.to.parent_id;

            //add to empty io-list
            if(action.to.id === null){
                from_io.order = 0;
                return new_state;
            }

            // MAKE AN EMPTY ORDER NR WHERE THE DRAGGED FITS
            // debugger;
            var found = false;
            for (var i = 0, cnt = 0; i < new_siblings.length; i++) {

                if(new_siblings[i].id === action.from.id) {
                    found = true;
                    cnt -= 1;
                    continue;
                }

                if(new_siblings[i].id === action.to.id){
                    if(found){
                        new_siblings[i].order = i + cnt;
                        cnt += 1;
                        from_io.order = i + cnt;
                    }else{
                        from_io.order = i + cnt;
                        cnt += 1;
                        new_siblings[i].order = i + cnt;
                    }
                    continue;
                }

                new_siblings[i].order = i + cnt;
            }

            return new_state;


        case CREATE_IO:

            var new_state = _.cloneDeep(state);
            return new_state;


        case UPDATE_IO_OPTIONS:

            var new_state = _.cloneDeep(state),
                io = _.find(new_state, (o) => o.id === action.id);

            io.options = action.options;

            return new_state;

        default:
            return state
    }

}

module.exports = io;


