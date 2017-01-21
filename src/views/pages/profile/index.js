// import { List } from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import styles from './profile.scss';

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      {"profile contents"}
    </div>
  );
};

Profile.propTypes = {
  signOut: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
