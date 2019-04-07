import { COLOR_PALETTE, SAVE } from '../constants';

const defaultState = {
    primary: {
        light: '',
        main: '',
    },
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch(type) {
        case COLOR_PALETTE + SAVE: {
            return {
                ...state,
                ...payload.data,
            }
        }

        default: {
            return state;
        }
    }
};