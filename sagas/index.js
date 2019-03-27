import { put } from 'redux-saga/effects';

export function* watcher () {
    yield put({ type: 'INIT' });
}
