import { call, put } from 'redux-saga/effects';
import { saveUserData, loginFail } from '../actions/user';
import UpcSDK from '../../sdk-core';
import { USER_DATA_KEY } from '../constants/storage';
import { encryptData, setStorageData } from '../utils';

export function* login (action) {
    const { payload: { data } } = action;
    try {
        const token = encryptData(data);
        const response = yield call(UpcSDK.loginUser, { data: { token } });
        if (response && response.userData) {
            const { access_token, refresh_token, ...rest } = response.userData;
            yield call(UpcSDK.saveToken, { access_token, refresh_token });

            setStorageData(USER_DATA_KEY, rest);
            yield put(saveUserData(rest));
        } else {
            yield put(loginFail());
        }
    } catch (error) {
        yield put(loginFail());
        console.log(error);
    }
}

export function* register (action) {
    const { payload: { data } } = action;
    try {
        const { email, password, ...rest } = data;
        const token = encryptData({ email, password });
        const response = yield call(UpcSDK.registerUser, { data: { ...rest, token } });
        if (response && response.userData) {
            const { access_token, refresh_token, ...rest } = response.userData;
            yield call(UpcSDK.saveToken, { access_token, refresh_token });

            setStorageData(USER_DATA_KEY, rest);
            yield put(saveUserData(rest));
        } else {
            yield put(loginFail());
        }
    } catch (error) {
        yield put(loginFail());
        console.log(error);
    }
}