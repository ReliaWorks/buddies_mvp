import React from 'react';
import { Text, Image, View } from 'react-native';
import { CardItem, Tile } from './common';

const tileIcon = "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984";

const BuddyCard = (props) => {
  const { firstName, age, activities, description, profileImageURL } = props.value;
  const { containerStyle, imageStyle, textStyle, descriptionStyle, descriptionContainerStyle } = styles;

  return (
      <View style={{flex: 1}}>
        <View style={containerStyle}>
          <Image
            source={{ uri: profileImageURL }}
            style={imageStyle}
          />
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
