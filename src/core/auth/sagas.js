/* eslint-disable no-constant-condition */
import { browserHistory as history } from 'react-router';
import { call, fork, put, take } from 'redux-saga/effects';
import { firebaseAuth } from 'core/firebase';
import { authActions } from './actions';
import { validateSignInInputs, rememberMe } from './auth';
import { notificationsActions } from '../notifications/actions';


function* authFlow(flow) {
  try {
    yield history.push(`/sign-in${flow}`);
  }
  catch (error) {
    yield history.push('/');
  }
}

function* signIn(credentials) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithEmailAndPassword], credentials.email, credentials.password);
    const localCredentials = yield call(rememberMe, credentials);
    yield put(authActions.setCredentialsFromLocalStorage(localCredentials));
    yield put(authActions.signInFulfilled(authData));
    yield history.push('/');
  }
  catch (error) {
    yield put(notificationsActions.handleMessage(error));
  }
}

function* createUser(credentials) {
  try {
    const validInputs = yield call(validateSignInInputs, credentials);

    if (validInputs) {
      const authData = yield call([firebaseAuth, firebaseAuth.createUserWithEmailAndPassword], credentials.email, credentials.password);
      yield authData.updateProfile({ displayName: credentials.firstname });
      // run fork for updateProfile to firebaseDB
      yield put(authActions.signInFulfilled(authData));
      yield history.push('/');
    } else {
      yield put(notificationsActions.handleMessage({ message: 'Passwords don\'t match', code: 'error'}));
    }

  }
  catch (error) {
    yield put(notificationsActions.handleMessage(error));
  }
}

function* signOut() {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(authActions.signOutFulfilled());
    yield history.replace('/sign-in');
  }
  catch (error) {
    yield put(authActions.signOutFailed(error));
  }
}


//=====================================
//  WATCHERS
//-------------------------------------

function* watchAuthFlow() {
  while (true) {
    let { payload } = yield take(authActions.AUTH_FLOW);
    yield fork(authFlow, payload.type);
  }
}

function* watchSignIn() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN);
    yield fork(signIn, payload.credentials);
  }
}

function* watchCreateUser() {
  while (true) {
    let { payload } = yield take(authActions.CREATE_USER);
    yield fork(createUser, payload.credentials);
  }
}

function* watchSignOut() {
  while (true) {
    yield take(authActions.SIGN_OUT);
    yield fork(signOut);
  }
}


//=====================================
//  AUTH SAGAS
//-------------------------------------

export const authSagas = [
  fork(watchAuthFlow),
  fork(watchCreateUser),
  fork(watchSignIn),
  fork(watchSignOut)
];
