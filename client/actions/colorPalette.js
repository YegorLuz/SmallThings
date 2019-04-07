import { COLOR_PALETTE, GET, SAVE } from '../constants';

export function getColorPalette () {
    return {
        type: COLOR_PALETTE + GET,
    };
}

export function saveColorPalette (data) {
    return {
        type: COLOR_PALETTE + SAVE,
        payload: {
            data,
        },
    };
}