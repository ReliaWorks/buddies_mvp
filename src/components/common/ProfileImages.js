import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Spinner } from './Spinner';

const { height } = Dimensions.get('window');

const ProfileImages = (props) => {
  const { profileImages } = props.value;
  const { profileImageContainer, profileImage } = styles;
  let pics = profileImages;


  if(profileImages.length === 0) {
    return (
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Spinner size="large" />
      </View>
    );
  }
  if(profileImages.length > 10) {
    pics = profileImages.slice(0, 9);
  }
  return (
    <View style={profileImageContainer}>
      <Swiper horizontal={false}>
        { pics.map((img, key) => {
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
    flex: 0.5,
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
