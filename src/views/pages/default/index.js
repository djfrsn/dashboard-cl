// import { List } from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import styles from './default.scss';

const Default = () => {
  return (
    <div className={styles.defaultContainer}>
      {"default contents"}
    </div>
  );
};

Default.propTypes = {
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
)(Default);
