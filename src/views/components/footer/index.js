import React, { PropTypes } from 'react';
import SignInFooter from 'views/components/sign-in-footer';
import styles from './footer.scss';


const Footer = ({auth, authFlow, routing}) => {
  return (auth.authenticated ?
    <footer className={styles.footerContainer}>
      {'hello'}
    </footer> : <SignInFooter auth={auth} authFlow={authFlow} routing={routing} />
  );
};


// Footer.propTypes = {
//   authenticated: PropTypes.bool.isRequired,
//   signOut: PropTypes.func.isRequired
// };


export default Footer;
