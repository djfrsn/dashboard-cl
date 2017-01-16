import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system'
import styles from './notification.scss';

export class Notification extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };

  constructor() {
    super(...arguments);

    this._notificationSystem = null;

    this._addNotification = ::this._addNotification;
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _addNotification(event) {
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
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
