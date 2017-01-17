import { Record } from 'immutable';
import { notificationsActions } from './actions';


export const NotificationsState = new Record({
  notification: { message: '', level: '' }
});

export function notificationsReducer(state = new NotificationsState(), {payload, type}) {
  switch (type) {
    case notificationsActions.POST_MESSAGE:
      return state.set('notification', payload.notification);

    case notificationsActions.CLEAR_MESSAGE:
      return state.set('notification', payload.notification);

    default:
      return state;
  }
}
