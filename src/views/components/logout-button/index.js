import React, { PropTypes } from 'react';
import styles from './logout_button.scss';

const LogoutButton = props => {
  return <button className={styles.logoutButton} onClick={props.signOut}>Logout</button>;
};

LogoutButton.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default LogoutButton;
