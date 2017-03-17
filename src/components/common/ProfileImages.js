import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Spinner } from './Spinner';
import { profileImageContainer, profileImage } from './styles';

const ProfileImages = (props) => {
  const { profileImages } = props.value;

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
                source={{ uri: img.url }}
                style={profileImage}
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

export { ProfileImages };
