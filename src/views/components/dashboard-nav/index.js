import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './dashboard_nav.scss';
import MobileNav from 'views/components/mobile-nav';
import Icon from 'views/components/icon';

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
        <MobileNav />
        <aside className={classNames([styles.aside]: true, 'g--2 g-med--3 g-small--6 g-tiny--12': true )}>
          <nav className={classNames('g--12 ': true, [styles.nav]: true )}>
            <div><Icon className="store" /><Link to="/">Dashboard</Link></div>
            <div><Icon className="shopping-cart" /><Link to="/orders">Orders</Link></div>
            <div><Icon className="library" /><Link to="/support">Support</Link></div>
            <div><Icon className="layers" /><Link to="/services">Services</Link></div>
            <div><Icon className="file-text" /><Link to="/invoices">Invoices</Link></div>
            <div><Icon className="navEmail" /><Link to="/emails">Emails</Link></div>
            <div><Icon className="flag" /><Link to="/paymentshistory">Payments history</Link></div>
          </nav>
        </aside>
      </div>
    );
  }
}

export default DashboardNav;
