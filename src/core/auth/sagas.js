/* eslint-disable no-constant-condition */
import { browserHistory as history } from 'react-router';
import { call, fork, put, take } from 'redux-saga/effects';
import { firebaseAuth } from 'core/firebase';
import { authActions } from './actions';


function* authFlow(type) {
  try {
    yield history.push(`/sign-in#${type}`);
  }
  catch (error) {
    yield history.push('/sign-in');
  }
}

function* signIn(credentials) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithEmailAndPassword], credentials.email, credentials.password);
    console.log('authData', authData)
    yield put(authActions.signInFulfilled(authData.user));
    yield history.push('/');
  }
  catch (error) {
    yield put(authActions.signInFailed(error));
  }
}

function* createUser(credentials) {
  console.log(firebaseAuth, firebaseAuth.createUserWithEmailAndPassword)
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.createUserWithEmailAndPassword], authProvider);
    yield put(authActions.signInFulfilled(authData.user));
    yield history.push('/');
  }
  catch (error) {
    yield put(authActions.signInFailed(error));
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
    let { payload } = yield take(authActions.SIGN_IN);
    yield fork(signIn, payload.authProvider);
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
  fork(watchSignIn),
  fork(watchSignOut)
];
