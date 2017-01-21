import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from '../button';
import styles from './header.scss';


const Header = ({auth, signOut}) => {
  return (
    <header className={styles.headerContainer}>
    <div className={styles.logoContainer}><h1 className={styles.logo}>Dashboard-cl</h1></div>
    <div className={styles.headerDetails}>
      <p className={styles.userName}>{auth.user.displayName}</p>
      <ul className={styles.utilityLinks}>
        <li><Link to="/profile">Profile</Link></li>
        <li><a onClick={signOut}>Sign Out</a></li>
      </ul>
    </div>
    </header>
  );
};


Header.propTypes = {
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
};


export default Header;
