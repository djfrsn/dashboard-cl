/* eslint-disable no-constant-condition */
import { browserHistory as history } from 'react-router';
import { delay } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';
import { notificationsActions } from './actions';
import { authActions } from '../auth/actions';

function* clearMessage() {
  yield put(notificationsActions.clearMessage());
}


//=====================================
//  WATCHERS
//-------------------------------------

function* watchMessage() {
  while (true) {
    yield take(notificationsActions.POST_MESSAGE);
    yield fork(clearMessage);
  }
}


//=====================================
//  AUTH SAGAS
//-------------------------------------

export const notificationsSagas = [
  fork(watchMessage)
];
