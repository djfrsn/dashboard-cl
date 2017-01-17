import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system'
import styles from './notification.scss';

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

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillUpdate(nextProps) {
    this.addNotification(nextProps.notifications.notification);
  }

  addNotification(notification) {
    const { message, level } = notification;
    const okMessage = (message !== '' && typeof message === 'string') && (level !== '' && typeof level === 'string');
    console.log('notification:', message);
    if (okMessage) {
      this.notificationSystem.addNotification({ message, level });
    }
  }

  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

export default Notification;
