import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import Button from 'views/components/button';
import styles from './sign_in.scss';
import logo from '../../../logo.png';


const SignInPage = ({signInWithGithub, signInWithGoogle, signInWithTwitter}) => {
  return (
    <div className={styles.signIn}>
      <div className={styles.centerContent}>
      <div className={styles.logo}><img src={logo} /></div>
      <form className={styles.form}>
        <button className={styles.createAccountButton} data-text="Create Account">+</button>
        <i className={styles.faEnvelope} aria-hidden="true"></i>
        <input className={styles.formInputs} type="text" required placeholder="Email" />
        <i className={styles.faLock} aria-hidden="true"></i>
        <input className={styles.formInputs} type="password" required placeholder="Password" />
        <div className={styles.rememberMeContainer}>
          <input type="checkbox" className={styles.checkbox} />
          <p className={styles.rememberMeText}>Remember Me</p>
        </div>
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
