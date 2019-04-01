import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

export function* watcher () {
    yield takeLatest('INIT', getProducts);
}

export function* getProducts () {
    const response = yield call(axios.get, 'http://localhost:3300/api/products');
    console.log(response);
    yield put({ type: 'SAVE', payload: { ...response.data } });
}