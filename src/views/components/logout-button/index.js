import React, { Component, PropTypes } from 'react';
import styles from './logout_button.scss';


export class LogoutButton extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired
  };

  render() {
    return (
      <button className={styles.logoutButton} onClick={this.props.signOut}>Logout</button>
    );
  }
}

export default LogoutButton;
