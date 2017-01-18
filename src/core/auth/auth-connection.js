import { FirebaseConnection } from 'core/firebase';
import { authActions } from './actions';
import { AuthRecord } from './authRecord';



export const authConnection = new FirebaseConnection({
  onAdd: authActions.createTaskFulfilled,
  onChange: authActions.updateTaskFulfilled,
  onLoad: authActions.loadTasksFulfilled,
  onRemove: authActions.removeTaskFulfilled
}, AuthRecord);
