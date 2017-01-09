import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import Button from 'views/components/button';
import styles from './sign_in.scss'


const SignInPage = ({signInWithGithub, signInWithGoogle, signInWithTwitter}) => {
  return (
    <div className={styles.signIn}>
      <div className={styles.centerContent}>
      <div className={styles.logo}>Dashboard</div>
      <form className={styles.form}>
        <button className={styles.createAccountButton} data-text="Create Account">+</button>
        <i className={styles.faEnvelope} aria-hidden="true"></i>
        <input type="text" required placeholder="Email" />
        <i className={styles.faLock} aria-hidden="true"></i>
        <input type="password" required placeholder="Password" />
        <input type="checkbox" />
        <p className={styles.rememberMeText}>Remember Me</p>
        <button className={styles.logInButton}>Log In<i className={styles.longArrowRight} aria-hidden="true"></i></button>
      </form>
      </div>
    </div>
  );
};

SignInPage.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signInWithGithub: authActions.signInWithGithub,
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithTwitter: authActions.signInWithTwitter
};

export default connect(
  null,
  mapDispatchToProps
)(SignInPage);
