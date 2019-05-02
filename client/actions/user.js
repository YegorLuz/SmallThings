import {USER, DATA, LOGIN, SUCCESS, FAIL, LOGGED_IN, SAVE, REGISTER, LOG_OUT, PING} from '../constants';

export function login (data = {}) {
    return {
        type: USER + LOGIN,
        payload: {
            data,
        },
    };
}

export function loginSuccess (userData) {
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

export function logOut () {
    return {
        type: USER + LOG_OUT,
    };
}

export function logOutUser () {
    return {
        type: USER + LOG_OUT + SAVE,
    };
}

export function saveUserData (userData) {
    return {
        type: USER + DATA + SAVE,
        payload: {
            userData,
        },
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

export function ping () {
    return {
        type: USER + PING,
    };
}