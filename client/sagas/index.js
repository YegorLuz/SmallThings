import { COMPANY_INFO, CATEGORIES, MENU, GET } from '../constants';
import { takeLatest } from 'redux-saga/effects';
import { getCompanyInfo } from './company';
import { getCategories } from './category';
import { getMenu } from './menu';

export function* watcher () {
    yield takeLatest(COMPANY_INFO + GET, getCompanyInfo);
    yield takeLatest(CATEGORIES + GET, getCategories);
    yield takeLatest(MENU + GET, getMenu);
}
