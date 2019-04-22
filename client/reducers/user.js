import { USER, LOGIN, SUCCESS, FAIL, LOGGED_IN, SAVE } from '../constants';

const defaultState = {
    userData: {},
    loggedIn: false,
};

export default (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER + LOGIN + SUCCESS: {
            return {
                ...state,
                userData: { ...payload.userData },
                loggedIn: true,
            };
        }

        case USER + LOGIN + FAIL: {
            return {
                ...state,
                userData: {},
                loggedIn: false,
            };
        }

        case USER + LOGGED_IN + SAVE: {
            return {
                ...state,
                loggedIn: payload.loggedIn,
            };
        }

        default: {
            return state;
        }
    }
};