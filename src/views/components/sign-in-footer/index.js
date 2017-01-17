import React, { Component, PropTypes } from 'react';
import styles from './sign_in_footer.scss';


export class SignInFooter extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    authFlow: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired
  };

  constructor() {
    super(...arguments);

    this.authFlow = ::this.authFlow;
    this.isAltAuthFlow = ::this.isAltAuthFlow;
    this.isSignInFlow = ::this.isSignInFlow;
    this.getAuthFlowType = ::this.getAuthFlowType;
  }

  getAuthFlowType() {
    return this.props.routing.locationBeforeTransitions.hash;
  }

  isAltAuthFlow() {
    return this.getAuthFlowType() === '#forgotpassword' || this.getAuthFlowType() === '#signup';
  }

  isSignInFlow() {
    return !this.isAltAuthFlow();
  }

  authFlow() {
    const authFlow = this.isAltAuthFlow() ? '#signin' : '#forgotpassword';
    this.props.authFlow(authFlow);
  }

  render() {
    const footerActionText = this.isAltAuthFlow() || !this.isSignInFlow() ? 'Login' : 'Forgot Password?';
    const footerActionIcon = this.isAltAuthFlow() ? 'zmdiBackArrow' : 'zmdiExclamationCircle';
    return (
      <footer className={styles.footer}>
        <div className={styles.footerAction}>
          <i className={styles[footerActionIcon]} aria-hidden="true" />
          <p className={styles.footerActionText} onClick={this.authFlow}>{footerActionText}</p>
        </div>
      </footer>
    );
  }
}

export default SignInFooter;
