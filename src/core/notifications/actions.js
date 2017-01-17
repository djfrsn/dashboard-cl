import pickBy from 'lodash.pickby';

export const storeDispatch = storeDispatch => { return storeDispatch; };

const getMessageType = data => {
  let type;
  const messageTypes = {
    isSuccess: ['tag'].indexOf(data.code) >= 0,
    isError: ['error', 'auth/email-already-in-use', 'auth/weak-password', 'auth/invalid-email', 'auth/user-disabled', 'auth/user-not-found', 'auth/wrong-password'].indexOf(data.code) >= 0,
    isWarning: ['tag'].indexOf(data.code) >= 0,
    isInfo: ['tag'].indexOf(data.code) >= 0
  };

  const messageType = Object.keys(pickBy(messageTypes, val => {
    return val === true;
  }))[0];

  switch(messageType) {
    case 'isSuccess':
      type = 'success';
      break;
    case 'isError':
      type = 'error';
      break;
    case 'isWarning':
      type = 'warning';
      break;
    case 'isInfo':
      type = 'info';
      break;
    default:
      type = '';
  }

  return type;
}

export const notificationsActions = {
  POST_MESSAGE: 'POST_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',

  message: notification => ({
    type: notificationsActions.POST_MESSAGE,
    payload: {notification}
  }),

  clearMessage: notification => ({
    type: notificationsActions.CLEAR_MESSAGE,
    payload: {notification: {message: '', level: ''}}
  }),

  handleMessage: data => notificationsActions.message({message: data.message, level: getMessageType(data)})
};
