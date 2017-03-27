import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { containerStyle, textStyle } from '../components/common/styles/Styles';
import NoConvoMatch from '../components/common/NoConvoMatch';
import ConversationListItem from '../components/common/ConversationListItem';
import sampleData from '../components/demo-data/demoData';
import matchesSampleData from '../components/demo-data/matchesSampleData';

class Matches extends Component {
  constructor() {
    super();

    const conversationsDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const matchesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: conversationsDS.cloneWithRows(sampleData),
      matchesDataSource: matchesDS.cloneWithRows(matchesSampleData),
    };
  }

  render() {
    return (
      <View style={containerStyle}>
        <View
          style={{
            flex: 1,
            padding: 10,
            alignSelf: 'flex-start'
          }}
        >
          <Text style={textStyle}>Matches</Text>
          <ListView
            style={styles.thumbnailContainerStyle}
            dataSource={this.state.matchesDataSource}
            renderRow={(matchData) => <NoConvoMatch {...matchData} />}
            horizontal
          />
        </View>
        <View
          style={{
            flex: 4,
            padding: 10,
            alignSelf: 'flex-start'
          }}
        >
          <Text style={textStyle}>Conversations</Text>
          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(data) => <ConversationListItem {...data} />}
          />
        </View>
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
  headerTextStyle: {
    fontSize: 18,
    fontFamily: 'Avenir-Book',
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

export default Matches;
