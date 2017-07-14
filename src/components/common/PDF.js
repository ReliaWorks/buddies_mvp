import React from 'react';
import { WebView } from 'react-native';

class PDF extends React.Component {
  render() {
    return (
      <WebView source={this.props.path} scalesPageToFit />
    );
  }
}

export { PDF };
