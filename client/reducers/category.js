import {CATEGORIES, CATEGORY, SAVE} from '../constants';

const defaultState = {
    categories: [],
    categoryId: '',
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES + SAVE: {
            const categories = payload.data
                .sort((a, b) => a.order - b.order)
                .reduce((acc, item) => {
                    const row = acc[item.row - 1] || [];
                    if (!row.length) {
                        acc.push(row);
                    }
                    row.push(item);
                    return acc;
                }, []);

            return {
                ...state,
                categories,
            };
        }

        case CATEGORY + SAVE: {
            return {
                ...state,
                categoryId: payload.categoryId,
            };
        }

        default: {
            return state;
        }
    }
}