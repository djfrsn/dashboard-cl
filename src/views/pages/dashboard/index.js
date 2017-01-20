// import { List } from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import styles from './dashboard.scss';

const Dashboard = ({children, signOut}) => {
  return (
    <div className={styles.dashboardContainer}>
      {"dashboard contents"}
    </div>
  );
};

Dashboard.propTypes = {
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
)(Dashboard);
