import {PRODUCTS, USER, LOGIN, HOME, PAGE, INIT, GET, REHYDRATE, REGISTRATION, REGISTER} from '../constants';
import { takeLatest } from 'redux-saga/effects';
import { getProducts } from './product';
import { login, register } from './user';
import { rehydrate, initHomePage, initLoginPage } from './pages';

export function* watcher () {
    yield takeLatest(HOME + PAGE + INIT, initHomePage);
    yield takeLatest(LOGIN + PAGE + INIT, initLoginPage);
    yield takeLatest(REGISTRATION + PAGE + INIT, initLoginPage);

    yield takeLatest(PRODUCTS + GET, getProducts);
    yield takeLatest(USER + LOGIN, login);
    yield takeLatest(USER + REGISTER, register);

    yield takeLatest(REHYDRATE, rehydrate);
}
