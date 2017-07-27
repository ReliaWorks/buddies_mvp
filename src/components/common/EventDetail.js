import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const eventData = {
  name: "Run & Chug 4 mile run",
  affiliationName: "Run & Chug",
  logo: "https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Faffiliation_logos%2Faffiliation_runandchung%402x.png?alt=media&token=6c22b56b-0af3-4323-b468-bb71ac11279c",
  eventDate: 1501403345928,
  longDescription: "Come join us for a night of food, fun, and running! Professional marathoner, filmmaker, and The North Face athlete Dean Karnazes will be at Run & Chug San Francisco on Thursday to talk about his adventures, his passions, and his support of adaptive climbing initiatives. With him, adaptive climber, skier, and Paradox Sports Ambassador Enock Glidden, will be talking about climbing El Capitan in Yosemite this past spring. Come hang out, ask questions, eat some pizza, and then climb with Cedar and Enock! Cedar and Enock’s presentation is free entry! Climbing with the guys after the presentation requires a day pass (we are offering half off during the event!).",
};

const { height, width } = Dimensions.get('window');

class EventDetail extends Component {
  renderEventPhoto(name, eventDate, logo) {
    const dateTime = Moment(eventDate).format("LLLL");

    return(
      <View style={styles.titleContainer}>
        <LinearGradient colors={['#EF3567', '#FFBD60']} style={styles.linearGradient}>
          <View style={{justifyContent: 'center', height: height > 300 ? height * 0.3 : 300 , backgroundColor: 'transparent'}}>
              <Text style={styles.titleText}>{name}</Text>
              <View style={{height: 10}} />
              <Text style={styles.titleText}>{dateTime}</Text>
          </View>
          </LinearGradient>
      </View>
    );
  }
  renderDetails(longDescription) {
    return(
      <View style={styles.detailsContainer}>
        <Text style={styles.detailHeaderText}>Details</Text>
        <View style={{height: 10}} />
        <Text style={styles.detailText}>{longDescription}</Text>
      </View>
    );
  }
  render() {
    const { name, affiliationName, logo, eventDate, longDescription } = eventData;

    return (
      <View style={styles.container}>
        {this.renderEventPhoto(name, eventDate, logo)}
        {this.renderDetails(longDescription)}
      </View>
    );
  }
}

const MARGIN = 15;
const styles = StyleSheet.create({
  container: {
//    justifyContent: 'center',
//    alignItems: 'center',
  },
  linearGradient: {
//    flex: 1,
//    justifyContent: 'flex-end',
    opacity: 1,
  },
  titleContainer: {
//    margin: MARGIN,
  },
  titleText: {
    color: 'white',
    fontFamily: 'Source Sans Pro',
    fontSize: 22,
    marginLeft: MARGIN,
    marginRight: MARGIN,
    fontWeight: '700',
  },
  detailsContainer: {
    margin: MARGIN,
  },
  detailHeaderText: {
    fontFamily: 'Source Sans Pro',
    fontWeight: '500',
    fontSize: 16,
  },
  detailText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
  },
  logoImage: {
    width: width * 0.5,
    height: height > 300 ? height * 0.2 : 150,
  },
});

export { EventDetail };
