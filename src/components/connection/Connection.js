import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/common';

const { width, height } = Dimensions.get('window');
const MARGIN = 15;
const CONNECTION_HEADER_TEXT = "You're connected";

class Connection extends Component {
  renderHeader(otherUserName) {
    const { headerView, headerStyle } = styles;
    return (
      <View style={headerView}>
        <Text style={headerStyle}>{CONNECTION_HEADER_TEXT}</Text>
        <Text style={headerStyle}>with {otherUserName}!</Text>
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

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderHeader(this.props.otherUser.name)}
        {this.renderProfilePics(this.props.currentUser.pic, this.props.otherUser.pic)}
        {this.renderMessageButton(this.props.startChat, this.props.keepBrowsing)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 0.3,
  },
  imageView: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 50,
//    backgroundColor: 'purple',
  },
  buttonsView: {
    flex: 0.5,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
//    backgroundColor: 'yellow'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
  buttonStyle: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#42D3D3',
    width: width - (MARGIN * 4),
    height: 50,
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginBottom: 25,
  },
  headerStyle: {
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
