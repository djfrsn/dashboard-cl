import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './dashboard_nav.scss';


export class DashboardNav extends Component {
  // static propTypes = {
  //   auth: PropTypes.object.isRequired,
  //   authFlow: PropTypes.func.isRequired,
  //   createUserWithEmailAndPassword: PropTypes.func.isRequired,
  //   routing: PropTypes.object.isRequired,
  //   sendPasswordResetEmail: PropTypes.func.isRequired,
  //   signInWithEmailAndPassword: PropTypes.func.isRequired
  // };

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <div className={styles.navContainer}>
        <div className={classNames('collapsible-wrap', styles.mobileMenu)}>
          <input type="checkbox" id="collapsible-1" />
          <label className={styles.menuLabel} htmlFor="collapsible-1">Menu</label>
          <div className={classNames('collapsible-1-area', styles.menuArea)}>
            <a id="home" className="menu-item" href="/">Dasboard</a>
            <a id="about" className="menu-item" href="/about">Orders</a>
            <a id="contact" className="menu-item" href="/contact">Support</a>
            <a className="menu-item--small" href="">Services</a>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardNav;
