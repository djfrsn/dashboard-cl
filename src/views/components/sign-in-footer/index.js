import React, { Component, PropTypes } from 'react';
import styles from './sign_in_footer.scss';


export class SignInFooter extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    handleFooterAction: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired
  };

  constructor() {
    super(...arguments);

    this.state = {title: ''};

    this.handleFooterAction = ::this.handleFooterAction;
    this.getAuthFlowType = ::this.getAuthFlowType;
    this.handleKeyUp = ::this.handleKeyUp;
  }

  clearInput() {
    this.setState({title: ''});
  }

  getAuthFlowType() {
    return this.props.routing.locationBeforeTransitions.hash;
  }

  isAltAuthFlow() {
    return this.getAuthFlowType() === '#forgotpassword' || this.getAuthFlowType() === '#signup';
  }

  handleFooterAction() {
    const authFlow = this.isAltAuthFlow() ? 'signin' : 'forgotpassword';
    this.props.handleFooterAction(authFlow);
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) this.clearInput();
  }

  render() {
    const footerActionText = this.isAltAuthFlow() || this.getAuthFlowType() === '#signin' ? 'Login' : 'Forgot Password?';
    const footerActionIcon = this.isAltAuthFlow() ? 'faBackArrow' : 'faExclamationCircle';
    return (
      <footer className={styles.footer}>
        <div className={styles.footerAction}>
          <i className={styles[footerActionIcon]} aria-hidden="true" />
          <p className={styles.footerActionText} onClick={this.handleFooterAction}>{footerActionText}</p>
        </div>
      </footer>
    );
  }
}

export default SignInFooter;
