import React from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const FullSizeImageModal = ({ visible, imageURI, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
      onPress={() => Actions.pop()}
    >
      <View style={styles.containerStyle}>
        <Image
          style={{ alignSelf: 'center', }}
          source={imageURI}
        />
        <Text style={styles.textStyle} onPress={onClose}>Close</Text>
      </View>
    </Modal>
  );
};

const styles = {
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  containerStyle: {
    backgroundColor: 'rgba(1, 1, 1, 1)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { FullSizeImageModal };
