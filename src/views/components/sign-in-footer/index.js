import React, { Component, PropTypes } from 'react';
import Icon from '../icon';
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
    const authFlow = this.isAltAuthFlow() ? '#default' : '#forgotpassword';
    this.props.authFlow(authFlow);
  }

  render() {
    const footerActionText = this.isAltAuthFlow() || !this.isSignInFlow() ? 'Login' : 'Forgot Password?';
    const footerActionIcon = this.isAltAuthFlow() ? 'backArrow' : 'exclamationCircle';
    return (
      <footer className={styles.footer}>
        <div className={styles.footerAction}>
          <Icon className={footerActionIcon} />
          <p className={styles.footerActionText} onClick={this.authFlow}>{footerActionText}</p>
        </div>
      </footer>
    );
  }
}

export default SignInFooter;
