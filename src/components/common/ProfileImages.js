import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Spinner } from './Spinner';
import { profileImageStyle } from './styles';

const ProfileImages = (props) => {
  const { profileImages, containerStyle } = props.value;

  if(profileImages.length === 0) {
    return (
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Spinner size="large" />
      </View>
    );
  }
  return (
    <View style={containerStyle}>
      <Swiper horizontal={false}>
        { profileImages.map((img, key) => {
          return (
            <View key={key}>
              <Image
                source={{ uri: img.url }}
                style={profileImageStyle}
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

export { ProfileImages };
