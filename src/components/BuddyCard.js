import React from 'react';
import { Text, Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { CardItem, Tile } from './common';

const tileIcon = "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984";

const BuddyCard = (props) => {
  const { firstName, age, activities, description, profileImageURL } = props.value;
  const { containerStyle, imageStyle, textStyle, descriptionStyle, descriptionContainerStyle } = styles;

  return (
      <View style={{flex: 1}}>
        <View style={containerStyle}>
          <Swiper horizontal={false}>
            <View>
              <Image
                source={{ uri: profileImageURL }}
                style={imageStyle}
              />
            </View>
            <View>
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2FPeter2.png?alt=media&token=debe4efa-7318-46fb-a47f-18ab9e34e9b1' }}
                style={imageStyle}
              />
            </View>
            <View>
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2FPeter3.JPG?alt=media&token=7844831f-a89b-439b-9e66-0774432d527f' }}
                style={imageStyle}
              />
            </View>
          </Swiper>
        </View>
        <View style={descriptionContainerStyle}>
          <Text style={textStyle}>{firstName}, {age}</Text>
          <Tile tileName={activities} tileIcon={tileIcon} />
          <Text style={descriptionStyle}>{description}</Text>
        </View>
      </View>
  );
};

const styles = {
  containerStyle: {
    flex: 2,
  },
  textStyle: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'Avenir-Book',
  },
  descriptionStyle: {
    fontSize: 16,
    padding: 10,
    fontFamily: 'Avenir-Book',
  },
  imageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 550,
    width: null
  },
  descriptionContainerStyle: {
    backgroundColor: 'white',
    flex: 1,
  }
};

export default BuddyCard;
