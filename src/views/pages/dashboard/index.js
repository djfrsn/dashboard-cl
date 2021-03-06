// import { List } from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import DashboardNav from 'views/components/dashboard-nav';
import DashboardCards from 'views/components/dashboard-cards';
import styles from './dashboard.scss';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <DashboardNav />
      <DashboardCards />
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
