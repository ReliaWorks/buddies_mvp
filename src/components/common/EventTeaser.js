import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';

const MARGIN = 15;

class EventTeaser extends Component {
  renderTitle(affiliationName) {
    return(
      <View style={styles.container}>
        <Text style={[styles.headerText, {fontSize: 15}]}>{affiliationName} is having an event</Text>
        <Text style={[styles.headerText, {fontSize: 15}]}>Get to know each other by attending together:</Text>
      </View>
    );
  }

  renderDetails(icon, eventTitle, eventDate, longDescription) {
//    const dateTime = Moment(eventDate).format("MMMM Do YYYY");
//    const dateTime = Moment(eventDate).calendar();
    const dateTime = Moment(eventDate).format("LLLL");

    return(
      <View style={styles.detailsContainer}>
        <Image source={{uri: icon}} style={styles.logoStyle} />
        <Text style={styles.headerText}>{eventTitle}</Text>
        <Text style={styles.dateText}>{dateTime}</Text>
        <Text
          style={styles.text}
          ellipsizeMode="tail"
          numberOfLines={3}
        >
          {longDescription}
        </Text>
      </View>
    );
  }

  render() {
    const { name, affiliationName, logo, eventDate, longDescription } = this.props.eventData;
    return (
      <View style={styles.container}>
        <View
          style={{
            borderWidth: 1,
            height: 1,
            width: 100,
            alignSelf: 'center',
            marginBottom: MARGIN,
            marginTop: MARGIN * 2,
            borderColor: '#42D3D3',
          }}
        />
        {this.renderTitle(affiliationName)}
        {this.renderDetails(logo, name, eventDate, longDescription)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: MARGIN * 2,
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Source Sans Pro',
    fontWeight: '500',
    textAlign: 'center',
    marginLeft: MARGIN,
    marginRight: MARGIN,
    paddingBottom: MARGIN,
  },
  logoStyle: {
    height: 150,
    width: 150,
  },
  dateText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 12,
    color: 'black',
    marginTop: MARGIN / 2,
    paddingRight: MARGIN,
  },
  text: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    color: 'black',
    margin: MARGIN * 2,
    paddingRight: MARGIN,
  },
});

export { EventTeaser };
