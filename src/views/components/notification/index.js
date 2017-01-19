import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';
// import styles from './notification.scss';

// https://github.com/igorprado/react-notification-system

export class Notification extends Component {
  static propTypes = {
    notifications: PropTypes.object.isRequired
  };

  constructor() {
    super(...arguments);

    this.notificationSystem = null;

    this.addNotification = ::this.addNotification;
  }

  componentWillUpdate(nextProps) {
    this.addNotification(nextProps.notifications.notification);
  }

  addNotification(notification) {
    const { message, level } = notification;
    const okMessage = (message !== '' && typeof message === 'string') && (level !== '' && typeof level === 'string');
    if (okMessage) {
      console.log('notification:', message); // eslint-disable-line no-console
      this.notificationSystem.addNotification({ message, level });
    }
  }

  render() {
    return (
      <div>
        <NotificationSystem ref={ref => this.notificationSystem = ref} />
      </div>
    );
  }
}

export default Notification;
