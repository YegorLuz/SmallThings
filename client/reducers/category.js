import { CATEGORIES, SAVE } from '../constants';

const defaultState = {
    categories: [],
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

        default: {
            return state;
        }
    }
}