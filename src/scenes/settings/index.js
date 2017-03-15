import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';

class SettingsScene extends Component {
  render() {
    const { firstName, email } = this.props;

    return(
      <Settings
        value={{
          firstName,
          email,
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, email } = state.currentUser;
  return { firstName, email };
};

export default connect(mapStateToProps)(SettingsScene);
