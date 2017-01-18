/* eslint-disable no-constant-condition */
import { browserHistory as history } from 'react-router';
import { call, fork, put, take } from 'redux-saga/effects';
import { firebaseAuth } from 'core/firebase';
import { authActions } from './actions';
import { validateSignInInputs, rememberMe } from './auth';
import { notificationsActions } from '../notifications/actions';
import { authConnection } from './auth-connection';

function subscribe() {
  return eventChannel(emit => authConnection.subscribe(emit));
}

function* read() {
  const channel = yield call(subscribe);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(context, method, onError, ...params) {
  try {
    yield call([context, method], ...params);
  }
  catch (error) {
    yield put(onError(error));
  }
}

const updateUserData = write.bind(null, authConnection, authConnection.push, authActions.updateUserDataFailed);

function* authFlow(flow) {
  try {
    yield history.push(`/sign-in${flow === '#default' ? '' : flow}`);
  }
  catch (error) {
    yield history.push('/');
  }
}

function* createUser(credentials) {
  yield put(authActions.processingAPIRequest(true));
  try {
    const validInputs = yield call(validateSignInInputs, credentials);

    if (validInputs) {
      yield put(authActions.processingAPIRequest(true));
      const authData = yield call([firebaseAuth, firebaseAuth.createUserWithEmailAndPassword], credentials.email, credentials.password);
      authConnection.path = `users/${authData.uid}`;
      yield authData.updateProfile({ displayName: credentials.firstname });
      yield put(authActions.processingAPIRequest(false));
      yield fork(updateUserData, { firstName: credentials.firstname, uid: authData.uid, email: credentials.email });
      yield put(authActions.signInFulfilled(authData));
      yield history.push('/');
    } else {
      yield put(notificationsActions.handleMessage({ message: 'Passwords don\'t match.', code: 'error'}));
    }

  }
  catch (error) {
    yield put(notificationsActions.handleMessage(error));
  }
  yield put(authActions.processingAPIRequest(false));
}

function* sendPasswordResetEmail(credentials) {
  yield put(authActions.processingAPIRequest(true));
  try {
    yield call([firebaseAuth, firebaseAuth.sendPasswordResetEmail], credentials.email);
    yield put(notificationsActions.handleMessage({ message: 'A password reset email has been sent successfully!', code: 'success'}));
    yield history.push('/');
  }
  catch (error) {
    yield put(notificationsActions.handleMessage(error));
  }
  yield put(authActions.processingAPIRequest(false));
}

function* signIn(credentials) {
  yield put(authActions.processingAPIRequest(true));
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
  yield put(authActions.processingAPIRequest(false));
}

function* signOut() {
  yield put(authActions.processingAPIRequest(true));
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(authActions.signOutFulfilled());
    yield history.replace('/sign-in');
  }
  catch (error) {
    yield put(authActions.signOutFailed(error));
  }
  yield put(authActions.processingAPIRequest(false));
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

function* watchSignOut() {
  while (true) {
    yield take(authActions.SIGN_OUT);
    yield fork(signOut);
  }
}

function* watchCreateUser() {
  while (true) {
    let { payload } = yield take(authActions.CREATE_USER);
    yield fork(createUser, payload.credentials);
  }
}

function* watchSendPasswordResetEmail() {
  while (true) {
    let { payload } = yield take(authActions.SEND_PASSWORD_RESET_EMAIL);
    yield fork(sendPasswordResetEmail, payload.email);
  }
}


//=====================================
//  AUTH SAGAS
//-------------------------------------

export const authSagas = [
  fork(watchAuthFlow),
  fork(watchCreateUser),
  fork(watchSendPasswordResetEmail),
  fork(watchSignIn),
  fork(watchSignOut)
];
