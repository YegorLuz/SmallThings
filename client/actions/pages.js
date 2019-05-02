import {HOME, LOGIN, REGISTRATION, PAGE, INIT, REHYDRATE, CATEGORY} from '../constants';

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

export function initCategoryPage (params) {
    return {
        type: CATEGORY + PAGE + INIT,
        payload: {
            params,
        },
    };
}
