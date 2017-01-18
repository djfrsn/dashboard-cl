import React, { Component, PropTypes } from 'react';
import Icon from '../icon';
import styles from './sign_in_form.scss';

const initialFormState = { email: '', firstname: '', password: '', confirmationpassword: '', rememberme: false };

export class SignInForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    authFlow: PropTypes.func.isRequired,
    createUserWithEmailAndPassword: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired,
    sendPasswordResetEmail: PropTypes.func.isRequired,
    signInWithEmailAndPassword: PropTypes.func.isRequired
  };

  constructor() {
    super(...arguments);

    this.state = {
      form: initialFormState,
      logoPosition: {display: 'none'}
    };

    this._onShow = ::this._onShow;
    this.getAuthFlow = ::this.getAuthFlow;
    this.getLogoPosition = ::this.getLogoPosition;
    this.getSubmitButtonText = ::this.getSubmitButtonText;
    this.handleChange = ::this.handleChange;
    this.handleKeyUp = ::this.handleKeyUp;
    this.handleSubmit = ::this.handleSubmit;
    this.isAltAuthFlow = ::this.isAltAuthFlow;
    this.showSignUp = ::this.showSignUp;
  }

  componentDidMount() {
    this.form = this.refs.form;
    this._onShow();
    const authFlow = this.getAuthFlow();
    const authFlowOk = authFlow !== "" && typeof authFlow === 'string';
    if (authFlowOk) {
      this.props.authFlow(authFlow);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.authFlow !== this.props.auth.authFlow) {
      this.setLogoPosition();
    }
  }

  _onShow() {
    let form = this.state.form;
    let logoPosition = this.getLogoPosition();

    if (this.props.auth.remembermeCredentials) {
      form = {
        ...this.state.form,
        rememberme: true,
        email: this.props.auth.remembermeCredentials.email,
        password: this.props.auth.remembermeCredentials.password
      };
    }

    this.setState({
      ...this.state,
      logoPosition,
      form
    });
  }

  showSignUp() {
    this.props.authFlow('#signup');
  }

  getAuthFlow() {
    return this.props.routing.locationBeforeTransitions.hash;
  }

  isAltAuthFlow() {
    return this.getAuthFlow() === '#forgotpassword' || this.getAuthFlow() === '#signup';
  }

  getLogoPosition() {
    let heightBuffer = 190;
    let logoPosition = { bottom: this.form.clientHeight + heightBuffer };
    return logoPosition;
  }

  setLogoPosition() {
    this.setState({...this.state, logoPosition: this.getLogoPosition() });
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

  clearInputs() {
    this.setState({form: initialFormState});
  }

  handleChange(event) {
    const inputtype = event.target.dataset.inputtype;

    this.setState({
      form: {...this.state.form,
      [inputtype]: inputtype === 'rememberme' ? event.target.checked : event.target.value}
    });
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) this.clearInput();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, firstname, confirmationpassword, rememberme } = this.state.form;
    const authFlow = this.props.auth.authFlow;

    switch (authFlow) {
      case '#default':
        this.props.signInWithEmailAndPassword({ email, password, rememberme });
        break;
      case '#signup':
        this.props.createUserWithEmailAndPassword({ email, password, firstname, confirmationpassword });
        break;
      case '#forgotpassword':
        this.props.sendPasswordResetEmail({ email });
        break;
      default:
    }

    this.clearInputs();
  }

  render() {
    const authFlowType = this.getAuthFlow();
    const isSignUp = this.getAuthFlow() === '#signup';
    const isForgotPassword = authFlowType === '#forgotpassword';
    const isAltAuthFlow = this.isAltAuthFlow();
    const submitButtonText = this.getSubmitButtonText(authFlowType);
    const processingRequest = this.props.auth.processingRequest;
    return (
      <div className={styles.centerContent}>
        <div className={styles.logo} style={this.state.logoPosition} ><h1>Dashboard-cl</h1></div>
        <form className={styles.form} onSubmit={this.handleSubmit} ref="form" >
          {!isAltAuthFlow ? <button className={styles.createAccountButton} onClick={this.showSignUp} data-text="Create Account">+</button> : null}
          <div className={classNames({[styles.inputContainer]: true, [styles.isForgotPassword]: isForgotPassword })}>
            <Icon className="email" />
            <input className={classNames({[styles.formInputs]: true, [styles.isForgotPassword]: isForgotPassword })} value={this.state.form.email} onChange={this.handleChange} data-inputtype="email" type="text" required placeholder="Your email address" />
          </div>
          {isSignUp ?
            <div className={styles.inputContainer}>
              <Icon className="account" />
              <input className={styles.formInputs} type="text" value={this.state.form.firstname} onChange={this.handleChange} data-inputtype="firstname" required placeholder="FirstName" />
            </div>
          : null}
          {!isForgotPassword ?
            <div className={styles.inputContainer}>
              <Icon className="lock" />
              <input className={styles.formInputs} type="password" value={this.state.form.password} onChange={this.handleChange} data-inputtype="password" required placeholder="Password" />
            </div> : <p className={styles.forgotPasswordText} >Enter your email to reset password. You will receive a new password after the reset link is confirmed.</p>}
          {isSignUp ?
            <div className={styles.inputContainer}>
              <Icon className="commentEdit" />
              <input className={styles.formInputs} type="password" value={this.state.form.confirmationpassword} onChange={this.handleChange} data-inputtype="confirmationpassword" required placeholder="Password confirm" />
            </div>
          : null}
          {!isAltAuthFlow ? <div className={styles.rememberMeContainer}>
            <input type="checkbox" checked={this.state.form.rememberme} className={styles.checkbox} onChange={this.handleChange} data-inputtype="rememberme" />
            <p>Remember Me</p>
          </div> : null}
          <button type="submit" className={styles.submitButton}>{submitButtonText}
            <Icon className={processingRequest ? 'spinner' : 'longArrowRight'} />
            </button>
        </form>
      </div>
    );
  }
}

export default SignInForm;
