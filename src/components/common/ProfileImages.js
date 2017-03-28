import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Spinner } from './Spinner';

const { height } = Dimensions.get('window');

const ProfileImages = (props) => {
  const { profileImages } = props.value;
  const { profileImageContainer, profileImage } = styles;


  if(profileImages.length === 0) {
    return (
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Spinner size="large" />
      </View>
    );
  }
  return (
    <View style={profileImageContainer}>
      <Swiper horizontal={false}>
        { profileImages.map((img, key) => {
          return (
            <View key={key}>
              <Image
                source={{ uri: img }}
                style={profileImage}
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

const styles = {
  profileImageContainer: {
    flex: 2.02,
    borderBottomWidth: 3,
  },
  profileImage: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (height * 0.5), //60% of the screen - navbar height - padding
    width: null,
  }
};


export { ProfileImages };
