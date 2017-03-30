import React, { Component } from 'react';
import { ListView, ScrollView, Text, View } from 'react-native';
//import NoConvoMatch from '../components/common/NoConvoMatch';
import ConversationListItem from '../../components/common/ConversationListItem';

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
//  {this.renderHeader()}

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <ListView
            style={styles.container}
            dataSource={this.props.matchesDataSource}
            renderRow={(data) => <ConversationListItem {...data} />}
            enableEmptySections
          />
        </ScrollView>
      </View>
    );
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
    fontSize: 22,
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
    marginRight: 10,
    flexDirection: 'row',
  }
};

export default MessageCenter;
