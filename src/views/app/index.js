import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import Notification from 'views/components/notification';
import styles from './app.scss';

function App({ children, notifications }) {
  return (
    <div className={styles.mainContainer}>
      <Notification notifications={notifications} />
      <main>{children}</main>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
  notifications: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  auth: state.auth,
  notifications: state.notifications
});

const mapDispatchToProps = {
  signOut: authActions.signOut
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
