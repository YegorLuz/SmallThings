import { PRODUCTS, GET, SAVE } from '../constants';

export function getProducts (params = {}) {
    return {
        type: PRODUCTS + GET,
        payload: {
            params,
        },
    };
}

export function saveProducts (data) {
    return {
        type: PRODUCTS + SAVE,
        payload: {
            data,
        },
    };
}
