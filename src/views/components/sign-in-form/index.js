import React, { Component, PropTypes } from 'react';
import styles from './sign_in_form.scss';


export class SignInForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired
  };

  constructor() {
    super(...arguments);

    this.state = {title: ''};

    this.handleChange = ::this.handleChange;
    this.handleKeyUp = ::this.handleKeyUp;
    this.handleSubmit = ::this.handleSubmit;
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
    return (
      <div className={styles.centerContent}>
        <div className={styles.logo}><h1>Dashboard-cl</h1></div>
        <form className={styles.form}>
          <button className={styles.createAccountButton} data-text="Create Account">+</button>
          <i className={styles.faEnvelope} aria-hidden="true" />
          <input className={styles.formInputs} type="text" required placeholder="Your email address" />
          <i className={styles.faLock} aria-hidden="true" />
          <input className={styles.formInputs} type="password" required placeholder="Password" />
          <div className={styles.rememberMeContainer}>
            <input type="checkbox" className={styles.checkbox} />
            <p className={styles.rememberMeText}>Remember Me</p>
          </div>
          <button className={styles.logInButton}>Log In<i className={styles.longArrowRight} aria-hidden="true" /></button>
        </form>
      </div>
    );
  }
}

export default SignInForm;
