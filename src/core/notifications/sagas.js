/* eslint-disable no-constant-condition */
import { browserHistory as history } from 'react-router';
import { delay } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';
import { notificationsActions } from './actions';
import { authActions } from '../auth/actions';

function* message(notification) {
  yield delay(1);
  yield put(notificationsActions.clearMessage());
}


//=====================================
//  WATCHERS
//-------------------------------------

function* watchMessage() {
  while (true) {
    yield take(notificationsActions.POST_MESSAGE);
    yield fork(message);
  }
}


//=====================================
//  AUTH SAGAS
//-------------------------------------

export const notificationsSagas = [
  fork(watchMessage)
];
