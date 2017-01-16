import React, { Component, PropTypes } from 'react';
import styles from './sign_in_form.scss';


export class SignInForm extends Component {
  static propTypes = {
    authFlow: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired
  };

  constructor() {
    super(...arguments);

    this.state = {title: ''};

    this.getAuthFlowType = ::this.getAuthFlowType;
    this.getSubmitButtonText = ::this.getSubmitButtonText;
    this.handleChange = ::this.handleChange;
    this.handleKeyUp = ::this.handleKeyUp;
    this.handleSubmit = ::this.handleSubmit;
    this.showSignUp = ::this.showSignUp;
  }
  showSignUp(event) {
    event.preventDefault();
    this.props.authFlow('signup');
  }

  getAuthFlowType() {
    return this.props.routing.locationBeforeTransitions.hash;
  }

  isAltAuthFlow() {
    return this.getAuthFlowType() === '#forgotpassword' || this.getAuthFlowType() === '#signup';
  }

  getSubmitButtonText(authFlowType) {
    let text;

    switch (authFlowType) {
      case '#signup':
        text = 'Sign Up';
        break;
      case '#forgotpassword':
        text = 'Reset Password';
        break;
      default:
        text = 'Log In';
    }

    return text;
  }

  clearInput() {
    this.setState({title: ''});
  }

  handleChange(event) {
    this.setState({title: event.target.value});
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) this.clearInput();
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    if (title.length) this.props.handleSubmit(title);
    this.clearInput();
  }

  render() {
    const authFlowType = this.getAuthFlowType();
    const isSignUp = authFlowType === '#signup';
    const isForgotPassword = authFlowType === '#forgotpassword';
    const isAltAuthFlow = this.isAltAuthFlow();
    const submitButtonText = this.getSubmitButtonText(authFlowType);
    return (
      <div className={styles.centerContent}>
        <div className={styles.logo}><h1>Dashboard-cl</h1></div>
        <form className={styles.form}>
          {!isAltAuthFlow ? <button className={styles.createAccountButton} onClick={this.showSignUp} data-text="Create Account">+</button> : null}
          <div className={styles.inputContainer}>
            <i className={styles.zmdiEmail} aria-hidden="true" />
            <input className={styles.formInputs} type="text" required placeholder="Your email address" />
          </div>
          {isSignUp ?
            <div className={styles.inputContainer}>
              <i className={styles.zmdiAccount} aria-hidden="true" />
              <input className={styles.formInputs} type="text" required placeholder="FirstName" />
            </div>
          : null}
          <div className={styles.inputContainer}>
            <i className={styles.zmdiLock} aria-hidden="true" />
            <input className={styles.formInputs} type="password" required placeholder="Password" />
          </div>
          {isSignUp ?
            <div className={styles.inputContainer}>
              <i className={styles.zmdiCommentEdit} aria-hidden="true" />
              <input className={styles.formInputs} type="text" required placeholder="Password confirm" />
            </div>
          : null}
          {!isAltAuthFlow ? <div className={styles.rememberMeContainer}>
            <input type="checkbox" className={styles.checkbox} />
            <p className={styles.rememberMeText}>Remember Me</p>
          </div> : null}
          <button className={styles.submitButton}>{submitButtonText}<i className={styles.zmdiLongArrowRight} aria-hidden="true" /></button>
        </form>
      </div>
    );
  }
}

export default SignInForm;
