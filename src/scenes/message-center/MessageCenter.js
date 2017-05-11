import React, { Component } from 'react';
import { ListView, ScrollView, Text, View } from 'react-native';
import NoConvoMatch from '../../components/common/NoConvoMatch';
import ConversationListItem from '../../components/common/ConversationListItem';
import { Spinner } from '../../components/common';
//import { homeLeftIconButton } from '../../icons';
//import { ICON_CLICKABLE_AREA_WIDTH } from '../../constants';

const MARGIN = 15;
const ZERO_CONVOS = `You have no messages but you have new connections waiting for you to say hi!`;
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

  renderZeroState(msg) {
    return(
      <View style={styles.zeroStateContainer}>
        <Text style={styles.zeroStateText}>
          {msg}
        </Text>
      </View>
    );
  }

  renderConversations(firstName) {
    if(this.props.matchesWithChatDataSource.getRowCount() === 0)
      return this.renderZeroState(`Hey ${firstName},\n\n${ZERO_CONVOS}`);
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
      <View style={{flex: 0.30, marginTop: MARGIN, marginLeft: MARGIN }}>
        <Text style={styles.headerText}>New Connections</Text>
        <ListView
          style={styles.container}
          dataSource={this.props.matchesWithoutChatDataSource}
          renderRow={(data) => <NoConvoMatch {...data} />}
          enableEmptySections
          initialListSize={25}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  render() {
    console.log(`In Message Center loading = ${this.props.loading }`);
    if(this.props.loading) {
      return <Spinner size="large" />;
    } else if(this.props.matchesWithChatDataSource.getRowCount() === 0 &&
       this.props.matchesWithoutChatDataSource.getRowCount() === 0) {
       return this.renderZeroState("Connect with people to start chatting");
    } else {
      return (
        <View style={{flex: 1, marginBottom: MARGIN}}>
          <ScrollView style={styles.container}>
            {this.renderNewConnections()}
            <View style={{borderBottomWidth: 1, marginTop: MARGIN}} />
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
    marginTop: 10,
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerText: {
    fontSize: 16,
//    color: '#00A3B7',
    fontFamily: 'Source Sans Pro',
    fontWeight: '500',
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
    alignSelf: 'center',
    padding: MARGIN * 3,
  },
  zeroStateText: {
    textAlign: 'left',
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    fontWeight: '700',
    color: '#00A3B7'
  },
};

export default MessageCenter;
