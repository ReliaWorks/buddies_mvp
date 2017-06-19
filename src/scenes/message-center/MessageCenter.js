import React, { Component } from 'react';
import { Dimensions, ListView, ScrollView, StyleSheet, Text, View } from 'react-native';
import NoConvoMatch from '../../components/common/NoConvoMatch';
import ConversationListItem from '../../components/common/ConversationListItem';
import { EmptyNewConnectionList, TypingDots } from '../../components/common';
//import { homeLeftIconButton } from '../../icons';
//import { ICON_CLICKABLE_AREA_WIDTH } from '../../constants';

const MARGIN = 15;
const { height } = Dimensions.get('window');
const ZERO_CONVOS = `You have no messages but you have new connections waiting for you to say Hi!`;
//const MSG_CENTER_TITLE_IMAGE = require("../../assets/img/MsgCenter.png");

class MessageCenter extends Component {
  /*
  renderHeader() {
    return(
      <View
        style={{
          flex: 0.1,
          marginTop: -60,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 3,
        }}
      >
        {homeLeftIconButton()}
        <Image source={MSG_CENTER_TITLE_IMAGE} style={{width: 25, height: 25, marginTop: 30}} />
        <View style={{width: ICON_CLICKABLE_AREA_WIDTH}} />
      </View>
     );
   }*/

  componentDidMount() {
    if(this.animation) this.animation.play();
  }

  renderZeroState(msg) {
    return (
      <View style={{flex: 1}}>
        <EmptyNewConnectionList />
        <View style={styles.zeroStateContainer}>
          <Text style={{...styles.zeroStateText, marginBottom: 10}}>Hey {this.props.firstName},</Text>
          <Text style={styles.zeroStateText}>
            {msg}
          </Text>
          <View style={{height: 50}} />
        </View>
      </View>
    );
  }

  renderConversations(firstName) {
    if(this.props.matchesWithChatDataSource.getRowCount() === 0)
    return(
      <View style={styles.zeroStateContainer}>
        <View style={styles.zeroStateTextContainer}>
        <Text style={{...styles.zeroStateText, textAlign: 'left'}}>
          Hey {firstName},
        </Text>
        <View style={{height: 10}} />
        <Text style={{...styles.zeroStateText, textAlign: 'left'}}>
          {ZERO_CONVOS}
        </Text>
        </View>
      </View>
    );
    return (
      <View style={{flex: 1}}>
          <ListView
            style={styles.container}
            dataSource={this.props.matchesWithChatDataSource}
            renderRow={(data) => <ConversationListItem {...data} />}
            enableEmptySections
            initialListSize={20}
          />
      </View>
    );
  }

  renderNewConnections() {
    if(this.props.matchesWithoutChatDataSource.getRowCount() === 0)
      return null;
    return (
      <View style={{flex: 1}}>
      <View style={{flex: 0.30, marginTop: MARGIN, marginLeft: MARGIN }}>
        <Text style={styles.headerText}>New Connections</Text>
        <ListView
          style={{...styles.container, marginTop: 10}}
          dataSource={this.props.matchesWithoutChatDataSource}
          renderRow={(data) => <NoConvoMatch {...data} />}
          enableEmptySections
          initialListSize={25}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{height: StyleSheet.hairlineWidth, backgroundColor: 'black', marginTop: MARGIN }} />
      </View>
    );
  }

  animationRef(animation) {
    this.animation = animation;
    if(this.animation)
      this.animation.play();
 }

  render() {
    if(this.props.loading) {
      return (
        <TypingDots animationRef={this.animationRef} />
      );
    } else if(this.props.matchesWithChatDataSource.getRowCount() === 0 &&
       this.props.matchesWithoutChatDataSource.getRowCount() === 0) {
       return this.renderZeroState("Browse and connect with members to start chatting.");
    } else {
      return (
        <View style={{flex: 1, marginBottom: MARGIN}}>
          <ScrollView style={styles.container}>
            {this.renderNewConnections()}
            {this.renderConversations(this.props.firstName)}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  noConvoThumbnailStyle: {
    flex: 1,
    height: 75,
    width: 75,
    marginRight: 10,
    flexDirection: 'row',
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  thumbnailContainerStyle: {
    flex: 1,
    marginRight: 15,
    marginTop: 15,
    flexDirection: 'row',
  },
  zeroStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: MARGIN,
    margin: MARGIN,
  },
  zeroStateText: {
    textAlign: 'left',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 24,
//    color: '#00A3B7'
  },
};

export default MessageCenter;
