import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import SignInForm from 'views/components/sign-in-form';
import SignInFooter from 'views/components/sign-in-footer';
import styles from './sign_in.scss';

const SignInPage = ({ auth, authFlow, createUserWithEmailAndPassword, routing, sendPasswordResetEmail, signInWithEmailAndPassword }) => {
  return (
    <div className={styles.signIn}>
      <SignInForm auth={auth} routing={routing} authFlow={authFlow} createUserWithEmailAndPassword={createUserWithEmailAndPassword} signInWithEmailAndPassword={signInWithEmailAndPassword} sendPasswordResetEmail={sendPasswordResetEmail} />
      <SignInFooter auth={auth} routing={routing} authFlow={authFlow} />
    </div>
  );
};

SignInPage.propTypes = {
  auth: PropTypes.object.isRequired,
  authFlow: PropTypes.func.isRequired,
  createUserWithEmailAndPassword: PropTypes.func.isRequired,
  routing: PropTypes.object.isRequired,
  sendPasswordResetEmail: PropTypes.func.isRequired,
  signInWithEmailAndPassword: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  auth: state.auth,
  routing: state.routing
});

const mapDispatchToProps = {
  authFlow: authActions.authFlow,
  createUserWithEmailAndPassword: authActions.createUserWithEmailAndPassword,
  sendPasswordResetEmail: authActions.sendPasswordResetEmail,
  signInWithEmailAndPassword: authActions.signInWithEmailAndPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);
