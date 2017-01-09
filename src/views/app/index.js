import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions, getAuth } from 'core/auth';
import Header from 'views/components/header';
import styles from './app.scss';

function App({authenticated, children, signOut}) {
  return (
    <div  className={styles.mainContainer}>
      <Header
        authenticated={authenticated}
        signOut={signOut}
      />

      <main>{children}</main>
    </div>
  );
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
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
