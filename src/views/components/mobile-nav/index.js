import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './mobile_nav.scss';


const MobileNav = () => {
  return (
     <div className={classNames('collapsible-wrap', styles.mobileMenu)}>
      <input type="checkbox" className={styles.menuCheckbox} id="collapsible-1" />
      <label className={styles.menuLabel} htmlFor="collapsible-1">Menu</label>
      <div className={classNames('collapsible-1-area', styles.menuArea)}>
        <a id="home" className="menu-item" href="/">Dasboard</a>
        <a id="about" className="menu-item" href="/about">Orders</a>
        <a id="contact" className="menu-item" href="/contact">Support</a>
        <a className="menu-item--small" href="">Services</a>
      </div>
    </div>
  );
};

export default MobileNav;
