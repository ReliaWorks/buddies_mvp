import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/common';
import ActivitySet from '../../components/buddycard/ActivitySet';

const { width, height } = Dimensions.get('window');
const MARGIN = 15;
const CONNECTION_HEADER_TEXT = "You're connected";
const COMMONALITY_TEXT = "Here's what you have in common";

class Connection extends Component {
  renderHeader(otherUserName) {
    const { headerView, headerTextStyle } = styles;
    return (
      <View style={headerView}>
        <Text style={headerTextStyle}>{CONNECTION_HEADER_TEXT}</Text>
        <Text style={headerTextStyle}>with {otherUserName}!</Text>
      </View>
    );
  }

  renderProfilePics(currentUserPic, otherUserPic) {
    return(
      <View style={styles.imageView}>
        <Image source={{ uri: currentUserPic }} style={styles.image} />
        <Image
          source={{ uri: otherUserPic }}
          style={{
            height: 140,
            width: 140,
            borderRadius: 70,
            marginLeft: -20,
            zIndex: 1,
          }}
        />
      </View>
    );
  }
  renderMessageButton(startChat, keepBrowsing) {
    return (
      <View style={styles.buttonsView}>
        <Button onPress={startChat} styles={styles}>SAY HI</Button>
        <Button onPress={keepBrowsing} styles={styles}>CHAT LATER</Button>
      </View>
    );
  }

  renderCommonality(commonInterests) {
    if(commonInterests.length === 0) return null;
    return (
      <View style={styles.commonalityView}>
        <Text style={styles.commonalityTextStyle}>{COMMONALITY_TEXT}</Text>
        <View style={{height: 10}} />
        <ActivitySet value={{activitiesAndAffiliations: commonInterests}} />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        {this.renderHeader(this.props.otherUser.name)}
        {this.renderProfilePics(this.props.currentUser.pic, this.props.otherUser.pic)}
        {this.renderCommonality(this.props.commonInterests)}
        {this.renderMessageButton(this.props.startChat, this.props.keepBrowsing)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
//    flex: 0.1,
    marginTop: 20,
  },
  imageView: {
//    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 30,
    marginBottom: 30
  },
  commonalityView: {
//    flex: 0.4,
    marginTop: MARGIN,
    marginBottom: MARGIN,
  },
  buttonsView: {
//    flex: 0.3,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
  commonalityTextStyle: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 18,
    textAlign: 'center'
  },
  buttonStyle: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#42D3D3',
    width: width - (MARGIN * 4),
    height: 50,
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginBottom: 15,
  },
  headerTextStyle: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 35,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
    zIndex: 2,
  }
});

export default Connection;
