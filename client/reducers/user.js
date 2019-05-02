import {USER, LOGIN, SUCCESS, FAIL, LOGGED_IN, SAVE, DATA, LOG_OUT} from '../constants';

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

        case USER + DATA + SAVE: {
            return {
                ...state,
                userData: { ...payload.userData },
            };
        }

        case USER + LOGGED_IN + SAVE: {
            return {
                ...state,
                loggedIn: payload.loggedIn,
            };
        }

        case USER + LOG_OUT + SAVE: {
            return {
                userData: {},
                loggedIn: false,
            };
        }

        default: {
            return state;
        }
    }
};