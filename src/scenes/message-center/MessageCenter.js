import React, { Component } from 'react';
import { Image, ListView, ScrollView, Text, View } from 'react-native';
import NoConvoMatch from '../../components/common/NoConvoMatch';
import ConversationListItem from '../../components/common/ConversationListItem';
import { homeLeftIconButton } from '../../icons';
import { ICON_CLICKABLE_AREA_WIDTH } from '../../config';

const MARGIN = 15;
const MSG_CENTER_TITLE_IMAGE = require("../../components/common/img/MsgCenter.png");

class MessageCenter extends Component {
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
   }

  renderZeroState() {
    return(
      <View style={styles.zeroStateContainer}>
        <Text style={styles.zeroStateText}>
          Connect with people to start chatting
        </Text>
      </View>
    );
  }

  renderConversations() {
    return (
      <View style={{flex: 0.7}}>
        <Text style={{...styles.headerText, marginLeft: MARGIN, marginRight: MARGIN, marginBottom: -10}}>Conversations</Text>
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
    return (
      <View style={{flex: 0.30, marginTop: MARGIN, marginLeft: MARGIN }}>
        <Text style={styles.headerText}>New Connections</Text>
        <ListView
          style={styles.container}
          dataSource={this.props.matchesWithoutChatDataSource}
          renderRow={(data) => <NoConvoMatch {...data} />}
          enableEmptySections
          initialListSize={25}
          horizontal
        />
      </View>
    );
  }

  render() {
    if(this.props.matchesWithChatDataSource.getRowCount() === 0)
      return (
        <View style={{flex: 1}}>
          {this.renderHeader()}
          {this.renderZeroState()}
        </View>
      );
    else {
      return (
        <View style={{flex: 1, marginBottom: MARGIN}}>
          {this.renderHeader()}
          <ScrollView style={styles.container}>
            {this.renderNewConnections()}
            <View style={{borderBottomWidth: 1, margin: MARGIN }} />
            {this.renderConversations()}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 10,
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Avenir-Book',
    fontWeight: '700',
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
    alignItems: 'center',
    padding: 80,
  },
  zeroStateText: {
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontSize: 22,
  },
};

export default MessageCenter;
