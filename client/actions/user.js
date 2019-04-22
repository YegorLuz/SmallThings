import { USER, LOGIN, SUCCESS, FAIL, LOGGED_IN, SAVE, REGISTER } from '../constants';

export function login (data = {}) {
    return {
        type: USER + LOGIN,
        payload: {
            data,
        },
    };
}

export function saveUserData (userData) {
    return {
        type: USER + LOGIN + SUCCESS,
        payload: {
            userData,
        },
    };
}

export function loginFail () {
    return {
        type: USER + LOGIN + FAIL,
    };
}

export function saveLoggedIn (loggedIn) {
    return {
        type: USER + LOGGED_IN + SAVE,
        payload: {
            loggedIn,
        },
    };
}

export function registerUser (data) {
    return {
        type: USER + REGISTER,
        payload: {
            data,
        },
    };
}