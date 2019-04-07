import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import UrlService from '../services/UrlService';
import { saveColorPalette } from '../actions/colorPalette';
import { saveCompanyInfo } from '../actions/company';

export function* getCompanyInfo () {
    try {
        const {data} = yield call(axios.get, UrlService.companyInfo());
        yield put(saveColorPalette(data.colorPalette));
        yield put(saveCompanyInfo(data.companyInfo));
    } catch (error) {
        console.error('Some shit happend...');
    }
}