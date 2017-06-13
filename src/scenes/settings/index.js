import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';
import { logoutUser, deactivateUser } from '../../actions';

class SettingsContainer extends Component {
  render() {
    const { firstName, email } = this.props;
    return (
      <Settings
        value={{
          firstName,
          email
        }}
        onLogout={() => this.props.logoutUser()}
        onDeactivate={() => this.props.deactivateUser()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, email, uid } = state.currentUser;
  return { firstName, email, uid };
};

export default connect(mapStateToProps, { logoutUser, deactivateUser })(SettingsContainer);
