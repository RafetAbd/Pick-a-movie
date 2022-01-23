const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = () => {
    return {
        type: OPEN_MODAL,
        isOpen: true
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
        isOpen: false
    }
}

export default (state = false, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return action.isOpen
        case CLOSE_MODAL:
            return action.isOpen
        default:
            return state
    }
}