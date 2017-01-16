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

    this.state = {logoPosition: {display: 'none'}};

    this.getAuthFlowType = ::this.getAuthFlowType;
    this.getSubmitButtonText = ::this.getSubmitButtonText;
    this.handleChange = ::this.handleChange;
    this.handleKeyUp = ::this.handleKeyUp;
    this.handleSubmit = ::this.handleSubmit;
    this.showSignUp = ::this.showSignUp;
  }

  componentDidMount() {
    this.setLogoPosition();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth.authFlow !== this.props.auth.authFlow) {
      this.setLogoPosition();
    }
  }

  showSignUp() {
    this.props.authFlow('signup');
  }

  getAuthFlowType() {
    return this.props.routing.locationBeforeTransitions.hash;
  }

  isAltAuthFlow() {
    return this.getAuthFlowType() === '#forgotpassword' || this.getAuthFlowType() === '#signup';
  }

  setLogoPosition() {
    let heightBuffer = 190;
    let height = this.form ? this.form.clientHeight : 370;
    let logoPosition = { bottom: height + heightBuffer };

    this.setState({...this.state, logoPosition});
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
    const isSignUp = this.getAuthFlowType() === '#signup';
    const isForgotPassword = authFlowType === '#forgotpassword';
    const isAltAuthFlow = this.isAltAuthFlow();
    const submitButtonText = this.getSubmitButtonText(authFlowType);
    return (
      <div className={styles.centerContent}>
        <div className={styles.logo} style={this.state.logoPosition}><h1>Dashboard-cl</h1></div>
        <form className={styles.form} ref={ref => { this.form = ref}}>
          {!isAltAuthFlow ? <button className={styles.createAccountButton} onClick={this.showSignUp} data-text="Create Account">+</button> : null}
          <div className={classNames({[styles.inputContainer]: true, [styles.isForgotPassword]: isForgotPassword })}>
            <i className={styles.zmdiEmail} aria-hidden="true" />
            <input className={classNames({[styles.formInputs]: true, [styles.isForgotPassword]: isForgotPassword })} type="text" required placeholder="Your email address" />
          </div>
          {isSignUp ?
            <div className={styles.inputContainer}>
              <i className={styles.zmdiAccount} aria-hidden="true" />
              <input className={styles.formInputs} type="text" required placeholder="FirstName" />
            </div>
          : null}
          {!isForgotPassword ?
          <div className={styles.inputContainer}>
            <i className={styles.zmdiLock} aria-hidden="true" />
            <input className={styles.formInputs} type="password" required placeholder="Password" />
          </div> : <p className={styles.forgotPasswordText} >Enter your email to reset password. You will receive a new password after the reset link is confirmed.</p>}
          {isSignUp ?
            <div className={styles.inputContainer}>
              <i className={styles.zmdiCommentEdit} aria-hidden="true" />
              <input className={styles.formInputs} type="text" required placeholder="Password confirm" />
            </div>
          : null}
          {!isAltAuthFlow ? <div className={styles.rememberMeContainer}>
            <input type="checkbox" className={styles.checkbox} />
            <p>Remember Me</p>
          </div> : null}
          <button className={styles.submitButton}>{submitButtonText}<i className={styles.zmdiLongArrowRight} aria-hidden="true" /></button>
        </form>
      </div>
    );
  }
}

export default SignInForm;
