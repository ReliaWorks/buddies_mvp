import React from 'react';
import { Dimensions, Image, Modal, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ICON_WIDTH = 25;
const MARGIN = 15;
const { width, height } = Dimensions.get('window');

const renderCloseIcon = (onClose) => {
  return (
    <TouchableOpacity onPress={onClose}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: MARGIN * 2,
        }}
      >
        <Icon
          name="close"
          size={ICON_WIDTH}
          color="white"
          style={{marginRight: MARGIN}}
        />
      </View>
    </TouchableOpacity>
  );
};

const PictureModal = ({ onClose, img, visible}) => {  
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{backgroundColor: 'black'}}>
        {renderCloseIcon(onClose)}
        <Image
          source={{ uri: img}}
          style={styles.fullScreenImg}
        />
      </View>
    </Modal>
  );
};

const styles = {
  fullScreenImg: {
    width: width,
    height: height * 0.60,
    marginTop: 50,
    marginBottom: 200,
  },
};

export { PictureModal };
