import { PRODUCTS, SAVE } from '../constants';

const defaultState = {
    products: [],
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PRODUCTS + SAVE: {
            return {
                ...state,
                products: [
                    ...payload.data,
                ],
            };
        }

        default: {
            return state;
        }
    }
};