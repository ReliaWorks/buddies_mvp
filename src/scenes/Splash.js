import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../components/common';
import { checkIfAlreadyLoggedIn } from '../actions';

class Splash extends Component {
  componentWillMount() {
    this.props.checkIfAlreadyLoggedIn();
  }

  render() {
    return <Spinner size="large" />;
  }
}

export default connect(null, { checkIfAlreadyLoggedIn })(Splash);
