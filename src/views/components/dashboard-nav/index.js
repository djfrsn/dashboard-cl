import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './dashboard_nav.scss';
import MobileNav from 'views/components/mobile-nav';

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
          <nav className={classNames('g--12 ': true )}>
            <a href="">About</a>
            <a href="">Contact</a>
            <a href="">blah</a>
          </nav>
        </aside>
      </div>
    );
  }
}

export default DashboardNav;
