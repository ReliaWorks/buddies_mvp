import React from 'react';
import { Dimensions, Image, Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

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

const ProfileImagesModal = ({ profileImages, onClose, visible, initialIndex}) => {
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{backgroundColor: 'black', flex: 1}}>
        {renderCloseIcon(onClose)}
        <Swiper
          contentContainerStyle={{
            flex: 1,
            alignItems: 'stretch'
          }}
          index={initialIndex}
          horizontal={false}
          dot={
            <View
              style={{
                backgroundColor: 'white',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#FF4F7D',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          paginationStyle={{
            bottom: height - 150,
          }}
        >
          { profileImages.map((img) => {
            return (
                <Image
                  key={img.key}
                  source={{ uri: img.url}}
                  style={styles.fullScreenImg}
                />
            );
          })}
        </Swiper>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenImg: {
    flex: 1,
    // width: width,
    // height: height * 0.60,
    marginTop: 50,
    marginBottom: 200,
  },
});

export { ProfileImagesModal };
