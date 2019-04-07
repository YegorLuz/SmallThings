import { COMPANY_INFO, GET } from '../constants';
import { takeLatest } from 'redux-saga/effects';
import { getCompanyInfo } from './company';

export function* watcher () {
    yield takeLatest(COMPANY_INFO + GET, getCompanyInfo);
}
