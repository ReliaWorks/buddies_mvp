import React from 'react';
import { Dimensions, Text, Image, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { CardItem, Tile } from './common';

const tileIcon = "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984";
const { height, width } = Dimensions.get('window');

const BuddyCard = (props) => {
  const { firstName, age, activities, description, profileImages } = props.value;
  const { containerStyle, nameTextStyle, imageStyle, textStyle, descriptionStyle, descriptionContainerStyle } = styles;

  return (
      <View style={{flex: 1, padding: 4}}>
        <View style={containerStyle}>
          <Swiper horizontal={false}>
            {profileImages.map((img, key) => {
              return (
                <View key={key}>
                  <Image
                    source={{ uri: img.imageURI }}
                    style={imageStyle}
                  />
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={descriptionContainerStyle}>
          <Text style={nameTextStyle}>{firstName}, {age}</Text>
          <Text style={textStyle}>San Francisco, California </Text>
          <Tile tileName={activities} tileIcon={tileIcon} />
          <Text style={descriptionStyle}>{description}</Text>
        </View>
      </View>
  );
};

const styles = {
  containerStyle: {
    flex: 3,
  },
  nameTextStyle: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: -10,
    fontFamily: 'Avenir-Book',
  },
  textStyle: {
    fontSize: 18,
    marginLeft: 10,
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
    height: (height * 0.6) - 25, //60% of the screen - navbar height - padding
    width: width - 20,
  },
  descriptionContainerStyle: {
    backgroundColor: 'white',
    flex: 2,
  }
};

export default BuddyCard;
