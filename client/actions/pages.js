import { HOME, LOGIN, REGISTRATION, PAGE, INIT, REHYDRATE } from '../constants';

export function rehydrate () {
    return {
        type: REHYDRATE,
    };
}

export function initHomePage () {
    return {
        type: HOME + PAGE + INIT,
    };
}

export function initLoginPage () {
    return {
        type: LOGIN + PAGE + INIT,
    };
}

export function initRegistrationPage () {
    return {
        type: REGISTRATION + PAGE + INIT,
    };
}