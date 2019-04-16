import { COMPANY_INFO, CATEGORIES, MENU, PRODUCTS, GET } from '../constants';
import { takeLatest } from 'redux-saga/effects';
import { getCompanyInfo } from './company';
import { getCategories } from './category';
import { getMenu } from './menu';
import { getProducts } from './product';

export function* watcher () {
    yield takeLatest(COMPANY_INFO + GET, getCompanyInfo);
    yield takeLatest(CATEGORIES + GET, getCategories);
    yield takeLatest(MENU + GET, getMenu);
    yield takeLatest(PRODUCTS + GET, getProducts);
}
