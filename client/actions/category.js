import { CATEGORIES, CATEGORY, GET, SAVE } from '../constants';

export function getCategories (params = {}) {
    return {
        type: CATEGORIES + GET,
        payload: {
            params,
        },
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

export function saveCategory (categoryId = '') {
    return {
        type: CATEGORY + SAVE,
        payload: {
            categoryId,
        },
    };
}