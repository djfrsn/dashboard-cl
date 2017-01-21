import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import Notification from 'views/components/notification';
import Header from 'views/components/header';
import Footer from 'views/components/footer';
import styles from './app.scss';


function App({ auth, authFlow, children, notifications, routing, signOut }) {
  const authenticated = auth.authenticated;
  const dashboard = routing.locationBeforeTransitions.pathname === '/';
  return (
    <div className={styles.appContainer}>
      <Notification notifications={notifications} />
      {authenticated ? <Header auth={auth} signOut={signOut} /> : null}
      <main className={classNames({[styles.mainContainer]: true, [styles.authenticated]: authenticated, [styles.dashboard]: dashboard })}>{children}</main>
      <Footer auth={auth} authFlow={authFlow} routing={routing} />
    </div>
  );
}


App.propTypes = {
  auth: PropTypes.object.isRequired,
  authFlow: PropTypes.func.isRequired,
  children: PropTypes.element,
  notifications: PropTypes.object.isRequired,
  routing: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  auth: state.auth,
  notifications: state.notifications,
  routing: state.routing
});

const mapDispatchToProps = {
  authFlow: authActions.authFlow,
  signOut: authActions.signOut
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
