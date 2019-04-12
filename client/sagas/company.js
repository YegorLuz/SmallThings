import { call, put } from 'redux-saga/effects';
import UpcSDK from '../../sdk-core';
import { saveColorPalette } from '../actions/colorPalette';
import { saveCompanyInfo } from '../actions/company';

export function* getCompanyInfo () {
    try {
        const response = yield call(UpcSDK.getCompanyInfo);
        if (response) {
            yield put(saveColorPalette(response.colorPalette));
            yield put(saveCompanyInfo(response.companyInfo));
        }
    } catch (error) {
        console.error('Some shit happened...', error);
    }
}