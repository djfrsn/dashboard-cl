import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import SignInForm from 'views/components/sign-in-form';
import SignInFooter from 'views/components/sign-in-footer';
import styles from './sign_in.scss';

const SignInPage = ({ auth, routing, authFlow, signIn }) => {
  return (
    <div className={styles.signIn}>
      <SignInForm auth={auth} routing={routing} handleSubmit={signIn} />
      <SignInFooter auth={auth} routing={routing} handleFooterAction={authFlow} />
    </div>
  );
};

SignInPage.propTypes = {
  auth: PropTypes.object.isRequired,
  authFlow: PropTypes.func.isRequired,
  routing: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired
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
  signIn: authActions.authFlow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);
