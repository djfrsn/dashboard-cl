import firebase from 'firebase';

export const authActions = {
  AUTH_FLOW: 'AUTH_FLOW',
  CREATE_USER: 'CREATE_USER',
  SEND_PASSWORD_RESET_EMAIL: 'SEND_PASSWORD_RESET_EMAIL',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  POST_MESSAGE: 'POST_MESSAGE',
  PROCESSING_API_REQUEST: 'PROCESSING_API_REQUEST',
  SET_CREDENTIALS_FROM_LOCAL_STORAGE: 'SET_CREDENTIALS_FROM_LOCAL_STORAGE',
  SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',

  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
  SIGN_OUT_FULFILLED: 'SIGN_OUT_FULFILLED',

  authFlow: type => ({
    type: authActions.AUTH_FLOW,
    payload: {type}
  }),

  processingAPIRequest: processingRequest => ({
    type: authActions.PROCESSING_API_REQUEST,
    payload: {processingRequest}
  }),

  createUser: credentials => ({
    type: authActions.CREATE_USER,
    payload: {credentials}
  }),

  sendPasswordResetEmail: email => ({
    type: authActions.SEND_PASSWORD_RESET_EMAIL,
    payload: {email}
  }),

  signIn: credentials => ({
    type: authActions.SIGN_IN,
    payload: {credentials}
  }),

  signInFailed: error => ({
    type: authActions.SIGN_IN_FAILED,
    payload: {error}
  }),

  signInFulfilled: authUser => ({
    type: authActions.SIGN_IN_FULFILLED,
    payload: {authUser}
  }),

  signInWithEmailAndPassword: credentials => authActions.signIn(
    credentials,
    firebase.auth.signInWithEmailAndPassword
  ),

  createUserWithEmailAndPassword: credentials => authActions.createUser(
    credentials,
    firebase.auth.createUserWithEmailAndPassword
  ),

  signOut: () => ({
    type: authActions.SIGN_OUT
  }),

  signOutFailed: error => ({
    type: authActions.SIGN_OUT_FAILED,
    payload: {error}
  }),

  signOutFulfilled: () => ({
    type: authActions.SIGN_OUT_FULFILLED
  }),

  setCredentialsFromLocalStorage: remembermeCredentials => ({
    type: authActions.SET_CREDENTIALS_FROM_LOCAL_STORAGE,
    payload: {remembermeCredentials}

  })
};
