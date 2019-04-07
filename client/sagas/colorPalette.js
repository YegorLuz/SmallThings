import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import UrlService from '../services/UrlService';
import { saveColorPalette } from '../actions/colorPalette';

export function* getColorPalette () {
    const { data } = yield call(axios.get, UrlService.colorPalette());
    yield put(saveColorPalette(data.colorPalette));
}