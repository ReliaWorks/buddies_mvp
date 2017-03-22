import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';
import { logoutUser } from '../../actions';

class SettingsScene extends Component {
  render() {
    const { firstName, email } = this.props;
    console.log(`In SettingsScene`);
    console.log(this.props);

    return (
      <Settings
        value={{
          firstName,
          email
        }}
        onLogout={() => this.props.logoutUser()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, email } = state.currentUser;
  return { firstName, email };
};

export default connect(mapStateToProps, { logoutUser })(SettingsScene);
