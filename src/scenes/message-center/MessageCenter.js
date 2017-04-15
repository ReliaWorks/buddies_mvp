import React, { Component } from 'react';
import { ListView, ScrollView, Text, View } from 'react-native';
import NoConvoMatch from '../../components/common/NoConvoMatch';
import ConversationListItem from '../../components/common/ConversationListItem';

const MARGIN = 15;

class MessageCenter extends Component {
  renderHeader() {
    return(
      <View
        style={{
          flex: 0.1,
          marginTop: -30,
          flexDirection: 'row',
          borderBottomWidth: 3,
        }}
      >
        <Text style={{marginLeft: 10, alignSelf: 'center'}} onPress={() => Actions.pop()}>
          Home
        </Text>
        <View style={{flexDirection: 'row', alignSelf: 'center' }}>
        <Text style={styles.headerText}>Connections</Text>
        </View>
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
        <Text style={{...styles.headerText, marginLeft: MARGIN, marginRight: MARGIN}}>Conversations</Text>
          <ListView
            style={styles.container}
            dataSource={this.props.matchesDataSource}
            renderRow={(data) => <ConversationListItem {...data} />}
            enableEmptySections
            initialListSize={25}
          />
      </View>
    );
  }

  renderNewConnections() {
    return (
      <View style={{flex: 0.30, marginTop: MARGIN, marginLeft: MARGIN }}>
        <Text style={styles.headerText}>New Connections</Text>
        <ListView
          style={styles.thumbnailContainerStyle}
          dataSource={this.props.matchesDataSource}
          renderRow={(data) => <NoConvoMatch {...data} />}
          enableEmptySections
          initialListSize={25}
          horizontal
        />
      </View>
    );
  }

  render() {
    if(this.props.matchesDataSource.getRowCount() === 0)
      return this.renderZeroState();
    else {
      return (
        <View style={{flex: 1, marginBottom: MARGIN}}>
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
    fontSize: 20,
    color: 'black',
    fontFamily: 'Avenir-Book',
    fontWeight: '700',
  },
  noConvoThumbnailStyle: {
    height: 75,
    width: 75,
    marginRight: 10
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
