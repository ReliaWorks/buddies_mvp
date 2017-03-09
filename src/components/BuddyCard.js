import React from 'react';
import { Dimensions, ListView, Image, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { CardItem, Tile } from './common';
import ActivitySet from './ActivitySet';

const tileIcon = "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984";
const { height, width } = Dimensions.get('window');

const BuddyCard = (props) => {
  const { firstName, age, location, profileImages, activities, affiliations, description } = props.value;
  const { containerStyle, listStyle, nameTextStyle, imageStyle, textStyle, descriptionStyle, descriptionContainerStyle } = styles;

  console.log(activities);
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
          <Text style={textStyle}>{location.city}</Text>
          <ActivitySet value={{activities}} />
          <Text style={descriptionStyle}>{description}</Text>
        </View>
      </View>
  );
};

//          <Tile tileName={activities[0].name} tileIcon={tileIcon} />
//<ActivityList />


const styles = {
  containerStyle: {
    flex: 3,
  },
  listStyle: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
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
