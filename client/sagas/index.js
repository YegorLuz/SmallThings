import {
    PRODUCTS,
    USER,
    LOGIN,
    HOME,
    PAGE,
    INIT,
    GET,
    REHYDRATE,
    REGISTRATION,
    REGISTER,
    LOG_OUT,
    PING,
    CATEGORY,
} from '../constants';
import { takeLatest } from 'redux-saga/effects';
import { getProducts } from './product';
import { login, register, logOut, ping } from './user';
import { rehydrate, initHomePage, initLoginPage, initCategoryPage } from './pages';

export function* watcher () {
    yield takeLatest(HOME + PAGE + INIT, initHomePage);
    yield takeLatest(LOGIN + PAGE + INIT, initLoginPage);
    yield takeLatest(REGISTRATION + PAGE + INIT, initLoginPage);
    yield takeLatest(CATEGORY + PAGE + INIT, initCategoryPage);

    yield takeLatest(PRODUCTS + GET, getProducts);
    yield takeLatest(USER + LOGIN, login);
    yield takeLatest(USER + REGISTER, register);
    yield takeLatest(USER + LOG_OUT, logOut);
    //yield takeLatest(USER + PING, ping);

    yield takeLatest(REHYDRATE, rehydrate);
}
