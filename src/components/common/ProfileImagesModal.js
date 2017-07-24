import React from 'react';
import { Dimensions, Image, Modal, Platform, TouchableOpacity, View, StyleSheet } from 'react-native';
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
      <View style={styles.swiperContainer}>
        {renderCloseIcon(onClose)}
        <Swiper
          loadMinimal={Platform.OS == 'ios'}
          contentContainerStyle={styles.swiperContainer}
          index={initialIndex}
          horizontal={Platform.OS == 'android'}
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
    //width: Platform.OS === 'ios' ? width : height,
    //height: Platform.OS === 'ios' ? height : width,
    marginTop: 50,
    marginBottom: 200,
    transform: Platform.OS === 'ios' ? [] : [{rotate: "90deg"}],
  },
  swiperContentStyle: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  swiperContainer: {
    backgroundColor: 'black',
    flex: 1,
    transform: Platform.OS === 'ios' ? [] : [{rotate: "-90deg"}],
  }
});

export { ProfileImagesModal };
