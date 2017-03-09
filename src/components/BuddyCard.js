import React from 'react';
import { Dimensions, ListView, Image, ScrollView, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import ActivitySet from './ActivitySet';

const tileIcon = "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Factivity_icons%2Frunning_exercise.png?alt=media&token=7b691e7a-5831-432a-a146-32dd04dc0984";
const { height, width } = Dimensions.get('window');


const BuddyCard = (props) => {
  const { firstName, age, location, profileImages, activities, affiliations, description } = props.value;
  const { containerStyle, listStyle, nameTextStyle, imageStyle, textStyle, descriptionStyle, descriptionContainerStyle } = styles;

  return (
      <View style={{flex: 1, padding: 4 }}>
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
          <ScrollView>
            <Text style={textStyle}>{firstName}, {age}</Text>
            <Text style={textStyle}>{location.city}</Text>
            <ActivitySet value={{activities}} />
            <Text style={textStyle}>{description}</Text>
          </ScrollView>
        </View>
      </View>
  );
};

//<ScrollView
//  contentContainerStyle={{backgroundColor: 'gainsboro'}}
//  automaticallyAdjustContentInsets={false}
//>

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
    width: width - 18,
  },
  descriptionContainerStyle: {
    flex: 2,
  }
};

export default BuddyCard;
