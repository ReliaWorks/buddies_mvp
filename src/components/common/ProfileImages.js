import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Spinner } from './Spinner';
import { textStyle } from './styles';

const { height, width } = Dimensions.get('window');

const renderNoPhotos = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: (height * 0.5),
        width: width,
        borderBottomWidth: 1
      }}
    >
      <Text style={textStyle}>No photos</Text>
    </View>
  );
};

const ProfileImages = (props) => {
  const { profileImages } = props.value;
  const { profileImageContainer, profileImage } = styles;
  let pics = profileImages;

  if(!profileImages) return renderNoPhotos();
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
    //flex: 1,
    borderBottomWidth: 3,
  },
  profileImage: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (height * 0.5),
    width: null,
  }
};


export { ProfileImages };
