import { COMPANY_INFO, SAVE } from '../constants';

const defaultState = {
    name: '',
    slogan: '',
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch(type) {
        case COMPANY_INFO + SAVE: {
            return {
                ...state,
                ...payload.data,
            };
        }

        default: {
            return state;
        }
    }
};