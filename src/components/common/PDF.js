import React from 'react';
import { Alert, Text, View, WebView, TouchableOpacity } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';

class PDF extends React.Component {
  componentWillMount() {
    Actions.refresh({ renderRightButton: this.renderRightButton.bind(this) });
  }

  renderRightButton() {
    return(
      <TouchableOpacity onPress={this.download.bind(this)}>
        <Text>Download</Text>
      </TouchableOpacity>
    );
  }

  download() {
    const sourcePath = RNFetchBlob.fs.asset('../../assets/pdfs/06232017WavelengthToS.pdf');
    const targetPath = RNFetchBlob.fs.dirs.DocumentDir;

    RNFetchBlob.fs.cp(sourcePath, targetPath)
    .then(() => {
      Alert.alert('Saved to ' + targetPath);
    })
    .catch((err) => {
      console.log('error while saving document:', err.message);
    });
  }

  render() {
    return (
      <WebView source={this.props.path} scalesPageToFit />
    );
  }
}

export { PDF };
