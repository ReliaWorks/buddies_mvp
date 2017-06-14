
import React, {Component} from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import { Button } from '../../components/common';

export default class ConnectionOptionsModal extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onClose()}>
      <Modal
        isVisible={this.props.visible}
        style={styles.container}
        transparent
      >
        <Button onPress={() => this.props.onUnMatch()}>
          <Text>Unmatch with {this.props.connectionName}</Text>
        </Button>

        <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.onClose()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
      </TouchableWithoutFeedback>
    );
  }
}

const MARGIN = 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: 'transparent',
    marginTop: MARGIN,
  },
  cancelButtonText: {
    color: 'white',
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    backgroundColor: 'transparent',
  }
});
