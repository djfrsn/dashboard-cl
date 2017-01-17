import { FirebaseConnection } from 'core/firebase';
import { taskActions } from './actions';
import { Task } from './task';



export const taskList = new FirebaseConnection({
  onAdd: taskActions.createTaskFulfilled,
  onChange: taskActions.updateTaskFulfilled,
  onLoad: taskActions.loadTasksFulfilled,
  onRemove: taskActions.removeTaskFulfilled
}, Task);
