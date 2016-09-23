const uid = require('uid');

const CLOSE_MODAL = 'CLOSE_MODAL',
    OPEN_MODAL = 'OPEN_MODAL';

function openModal(data, tpl) {
    let modal = {
        id: uid(),
        data: data,
        tpl: tpl
    }

    return {
        type: OPEN_MODAL,
        modal: modal
    }
}

function closeModal(id) {
    return {
        type: CLOSE_MODAL,
        id: id
    }
}


module.exports = {
    OPEN_MODAL: OPEN_MODAL,
    openModal: openModal,
    CLOSE_MODAL: CLOSE_MODAL,
    closeModal: closeModal
};