import { Record } from 'immutable';
import { authActions } from './actions';


export const AuthState = new Record({
  authFlow: 'initial',
  processingRequest: false,
  remembermeCredentials: null,
  authError: null,
  authenticated: false,
  uid: null,
  user: null
});

export function authReducer(state = new AuthState(), {payload, type}) {
  switch (type) {
    case authActions.AUTH_FLOW:
      return state.merge({
        authFlow: payload.type
      });

    case authActions.PROCESSING_API_REQUEST:
      return state.merge({
        processingRequest: payload.processingRequest
      });

    case authActions.SIGN_IN_FULFILLED:
      return state.merge({
        authenticated: true,
        authError: null,
        uid: payload.uid,
        user: payload
      });

    case authActions.SIGN_OUT_FULFILLED:
      return state.merge({
        authenticated: false,
        authError: null,
        uid: null,
        user: null
      });

    case authActions.SIGN_IN_FAILED:
      return state.merge({
        authError: payload.error
      });

    case authActions.CREATE_USER_FAILED:
      return state.merge({
        authError: payload.error
      });

    case authActions.SET_CREDENTIALS_FROM_LOCAL_STORAGE:
      return state.set('remembermeCredentials', payload.remembermeCredentials);

    default:
      return state;
  }
}
