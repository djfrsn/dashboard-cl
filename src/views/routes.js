import { isAuthenticated } from 'core/auth';
import App from './app';
import SignInPage from './pages/sign-in';
import Dashboard from './pages/dashboard';


export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SCREEN_LOCK: '/lock'
};


const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.TASKS);
    }
  };
};


export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: Dashboard,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.SCREEN_LOCK,
        component: SignInPage,
        onEnter: requireUnauth(getState)
      },
      {
        path: paths.SIGN_IN,
        component: SignInPage,
        onEnter: requireUnauth(getState)
      }
    ]
  };
};
