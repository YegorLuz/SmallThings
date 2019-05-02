import { call, put } from 'redux-saga/effects';
import { saveCategories } from '../actions/category';
import UpcSDK from '../../sdk-core';

export function* getCategories (action) {
    const { payload: { params = {} } } = action;
    try {
        const response = yield call(UpcSDK.getCategories, params);
        if (response && response.categories) {
            yield put(saveCategories(response.categories));
        }
    } catch (error) {
        console.log('Error', error);
    }
}