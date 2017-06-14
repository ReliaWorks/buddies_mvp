import React, { Component } from 'react';
import { Image, Modal, StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MSG_CENTER_NOT_ICON } from '../../constants';

class FirstConnectionHelperModal extends Component {
  render() {
    const { visible, firstName, close } = this.props;

    return (
      <Modal
        visible={visible}
        animationType="none"
        onRequestClose={() => Actions.browse()}
      >
      <TouchableWithoutFeedback onPress={() => Actions.browse()}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: 30,
            justifyContent: 'center'
          }}
        >
          <View style={styles.container}>
            <Image source={MSG_CENTER_NOT_ICON} style={{height: 81, width: 93 }} />
            <View style={{margin: 30}}>
              <Text style={styles.textStyle}>Nice find, you will be notified when they connect with you too!</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    paddingTop: 30,
    paddingBottom: 30,
  },
  textStyle: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 21,
    textAlign: 'center',
  }
});

export { FirstConnectionHelperModal };
