import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions, getAuth } from 'core/auth';
import Notification from 'views/components/notification';
import styles from './app.scss';

// <Header
//  authenticated={authenticated}
//  signOut={signOut}
// />

function App({ state, children }) {
  console.log(state);
  return (
    <div className={styles.mainContainer}>
      <Notification message={{}} />
      <main>{children}</main>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
  signOut: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = getAuth;

const mapDispatchToProps = {
  signOut: authActions.signOut
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
