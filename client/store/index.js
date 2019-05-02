import { createStore, applyMiddleware } from 'redux';
import nextReduxWrapper from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/';
import { watcher } from '../sagas/';

let reduxStore = null;
export const makeStore = (reducers, initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(watcher);
  return store;
};

export const initStore = (initialState, { isServer }) => {
  // Make sure to create a new store for every server-side request so that data
  if (isServer) {
    return makeStore(rootReducer, initialState);
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = makeStore(rootReducer, initialState);
  }
  return reduxStore;
};

export function withReduxSaga(BaseComponent) {
  return nextReduxWrapper(initStore, { debug: false })(nextReduxSaga(BaseComponent));
}
