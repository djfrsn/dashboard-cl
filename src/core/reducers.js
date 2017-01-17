import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './auth';
import { notificationsReducer } from './notifications';
import { tasksReducer } from './tasks';


export default combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  routing: routerReducer,
  tasks: tasksReducer
});
