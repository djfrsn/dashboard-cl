import firebase from 'firebase';


export const authActions = {
  AUTH_FLOW: 'AUTH_FLOW',
  CREATE_USER: 'CREATE_USER',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',

  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
  SIGN_OUT_FULFILLED: 'SIGN_OUT_FULFILLED',


  authFlow: type => ({
    type: authActions.AUTH_FLOW,
    payload: {type}
  }),

  createUser: credentials => ({
    type: authActions.CREATE_USER,
    payload: {authProvider}
  }),

  signIn: (credentials, authProvider) => ({
    type: authActions.SIGN_IN,
    payload: {credentials, authProvider}
  }),

  signInFailed: error => ({
    type: authActions.SIGN_IN_FAILED,
    payload: {error}
  }),

  signInFulfilled: authUser => ({
    type: authActions.SIGN_IN_FULFILLED,
    payload: {authUser}
  }),

  signInWithEmailAndPassword: (credentials) => authActions.signIn(
    credentials,
    firebase.auth.signInWithEmailAndPassword
  ),

  createUserWithEmailAndPassword: (credentials) => authActions.createUser(
    credentials,
    new firebase.auth.createUserWithEmailAndPassword()
  ),

  signInWithGithub: () => authActions.signIn(
    new firebase.auth.GithubAuthProvider()
  ),

  signInWithGoogle: () => authActions.signIn(
    new firebase.auth.GoogleAuthProvider()
  ),

  signInWithTwitter: () => authActions.signIn(
    new firebase.auth.TwitterAuthProvider()
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
  })
};
