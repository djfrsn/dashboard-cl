import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import Notification from 'views/components/notification';
import LogoutButton from 'views/components/logout-button';
import styles from './app.scss';


function App({ auth, children, notifications, signOut }) {
  const authenticated = auth.authenticated;
  return (
    <div className={styles.mainContainer}>
      <Notification notifications={notifications} />
      {authenticated ? <header>
        <LogoutButton signOut={signOut} />
      </header> : null}
      <main>{children}</main>
      {authenticated ? <footer>
        {'hello'}
      </footer> : null}
    </div>
  );
}


App.propTypes = {
  auth: PropTypes.object.isRequired,
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
