import pickBy from 'lodash.pickby';

export const storeDispatch = storeDispatch => { return storeDispatch; };

const getMessageLevel = data => {
  let level;
  const messageLevels = {
    isSuccess: ['success'].indexOf(data.code) >= 0,
    isError: ['error', 'auth/email-already-in-use', 'auth/weak-password', 'auth/invalid-email', 'auth/user-disabled', 'auth/user-not-found', 'auth/wrong-password'].indexOf(data.code) >= 0,
    isWarning: ['warning'].indexOf(data.code) >= 0,
    isInfo: ['info'].indexOf(data.code) >= 0
  };

  const messageLevel = Object.keys(pickBy(messageLevels, level => {
    return level === true;
  }))[0];

  switch(messageLevel) {
    case 'isSuccess':
      level = 'success';
      break;
    case 'isError':
      level = 'error';
      break;
    case 'isWarning':
      level = 'warning';
      break;
    case 'isInfo':
      level = 'info';
      break;
    default:
      level = '';
  }

  return level;
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

  handleMessage: data => notificationsActions.message({message: data.message, level: getMessageLevel(data)})
};
