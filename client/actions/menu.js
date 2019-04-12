import { MENU, GET, SAVE } from '../constants';

export function getMenu () {
    return {
        type: MENU + GET,
    };
}

export function saveMenu (data) {
    return {
        type: MENU + SAVE,
        payload: {
            data,
        },
    };
}