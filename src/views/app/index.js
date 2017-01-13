import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions, getAuth } from 'core/auth';
// import Header from 'views/components/header';
import styles from './app.scss';

// <Header
//  authenticated={authenticated}
//  signOut={signOut}
// />

function App({ children }) {
  return (
    <div className={styles.mainContainer}>
      <main>{children}</main>
    </div>
  );
}

App.propTypes = {
  // authenticated: PropTypes.bool.isRequired,
  children: PropTypes.element
  // signOut: PropTypes.func.isRequired
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
