import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/common';

const CONNECTION_HEADER_TEXT = "You're connected!";

class Connection extends Component {
  renderHeader() {
    const { headerView, headerStyle } = styles;
    return (
      <View style={headerView}>
        <Text style={headerStyle}>{CONNECTION_HEADER_TEXT}</Text>
      </View>
    );
  }

  renderProfilePics(currentUserPic, otherUserPic) {
    return(
      <View style={styles.imageView}>
        <Image source={{ uri: currentUserPic }} style={styles.image} />
        <Image source={{ uri: otherUserPic }} style={styles.image} />
      </View>
    );
  }
  renderMessageButton(startChat, keepBrowsing) {
    return (
      <View style={styles.buttonsView}>
        <Button onPress={startChat}>Say Hi</Button>
        <Button onPress={keepBrowsing}>Chat Later</Button>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        {this.renderProfilePics(this.props.currentUser.pic, this.props.otherUser.pic)}
        {this.renderMessageButton(this.props.startChat, this.props.keepBrowsing)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },
  imageView: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonsView: {
    flex: 0.2,
    marginTop: 10,
    marginBottom: 10,
  },
  headerStyle: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 35,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 20
  }
});

export default Connection;
