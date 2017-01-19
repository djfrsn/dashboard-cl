// import { List } from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from 'core/auth';
import LogoutButton from 'views/components/logout-button';


const TasksPage = ({signOut}) => {
  return (
    <div>
      <LogoutButton signOut={signOut} />
    </div>
  );
};

TasksPage.propTypes = {
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
)(TasksPage);
