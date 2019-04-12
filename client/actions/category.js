import { CATEGORIES, GET, SAVE } from '../constants';

export function getCategories () {
    return {
        type: CATEGORIES + GET,
    };
}

export function saveCategories (data) {
    return {
        type: CATEGORIES + SAVE,
        payload: {
            data,
        },
    };
}