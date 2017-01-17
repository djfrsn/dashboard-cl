import { firebaseAuth } from 'core/firebase';
import { authActions } from './actions';
import { localStorage } from 'utils/localStorage';

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          dispatch(authActions.signInFulfilled(authUser));
        }

        resolve();
        unsubscribe();
      },

      error => reject(error)
    );
  });
}

export function setCredentialsFromLocalStorage(dispatch) {
  return dispatch(authActions.setCredentialsFromLocalStorage(localStorage('dashboard-cl')));
}

export function validateSignInInputs(credentials) {
  return credentials.password === credentials.confirmationpassword;
}

export function rememberMe(credentials) {
  localStorage('dashboard-cl', credentials.rememberme ? credentials : null);
  return localStorage('dashboard-cl');
}
