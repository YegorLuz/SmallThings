import { call, put } from 'redux-saga/effects';
import { saveProducts } from '../actions/product';
import UpcSDK from '../../sdk-core';

export function* getProducts (action) {
    const { payload: { params = {} } } = action;
    try {
        const response = yield call(UpcSDK.getProducts, params);
        if (response && response.products) {
            yield put(saveProducts(response.products));
        }
    } catch (err) {
        console.log(err);
    }
}