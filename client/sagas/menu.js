import { call, put } from 'redux-saga/effects';
import UpcSDK from '../../sdk-core';
import { saveMenu } from '../actions/menu';

export function* getMenu () {
    try {
        const response = yield call(UpcSDK.getMenu);
        console.log('saga', response);
        if (response) {
            yield put(saveMenu(response.menu));
        }
    } catch (error) {
        console.log('getMenu', error);
    }
}