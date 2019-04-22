import { call, put } from 'redux-saga/effects';
import UpcSDK from '../../sdk-core';
import { USER_DATA_KEY } from '../constants/storage';
import { saveColorPalette } from '../actions/colorPalette';
import { saveCompanyInfo } from '../actions/company';
import { saveMenu } from '../actions/menu';
import { saveCategories } from '../actions/category';
import { saveUserData, saveLoggedIn } from '../actions/user';
import { getAllStorageData } from '../utils';

export function* initHomePage () {
    try {
        const response = yield call(UpcSDK.initHomePage);

        if (response) {
            const { pages, categories, colorPalette, companyInfo, loggedIn = false } = response;
            yield put(saveMenu(pages));
            yield put(saveCategories(categories));
            yield put(saveColorPalette(colorPalette));
            yield put(saveCompanyInfo(companyInfo));
            yield put(saveLoggedIn(loggedIn));
        }
    } catch (error) {
        console.log('saga -> initHomePage', error);
    }
}

export function* initLoginPage () {
    try {
        const response = yield call(UpcSDK.initLoginPage);

        if (response) {
            const { colorPalette, companyInfo, loggedIn = false } = response;
            yield put(saveColorPalette(colorPalette));
            yield put(saveCompanyInfo(companyInfo));
            yield put(saveLoggedIn(loggedIn));
        }
    } catch (error) {
        console.log('saga -> initLoginPage', error);
    }
}

export function* rehydrate () {
    const data = yield call(getAllStorageData);
    const userData = data[USER_DATA_KEY] || {};
    yield put(saveUserData(userData));
}
