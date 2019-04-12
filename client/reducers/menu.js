import { MENU, SAVE } from '../constants';

const defaultState = {
    pages: [],
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case MENU + SAVE: {
            return {
                ...state,
                pages: [ ...payload.data ],
            }
        }

        default: {
            return state;
        }
    }
}