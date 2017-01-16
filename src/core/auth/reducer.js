import { Record } from 'immutable';
import { authActions } from './actions';


export const AuthState = new Record({
  authFlow: 'initial',
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

    case authActions.SIGN_IN_FULFILLED:
      return state.merge({
        authenticated: true,
        uid: payload.uid,
        user: payload
      });

    case authActions.SIGN_OUT_FULFILLED:
      return state.merge({
        authenticated: false,
        uid: null,
        user: null
      });

    default:
      return state;
  }
}
