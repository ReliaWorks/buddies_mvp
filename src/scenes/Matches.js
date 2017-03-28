import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { containerStyle, textStyle } from '../components/common/styles/Styles';
import NoConvoMatch from '../components/common/NoConvoMatch';
import ConversationListItem from '../components/common/ConversationListItem';
import sampleData from '../components/demo-data/demoData';
import { matchesFetch } from '../actions';

class Matches extends Component {
/*  constructor() {
    super();

    const conversationsDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: conversationsDS.cloneWithRows(sampleData),
    };
  }
  */

  componentWillMount() {
    this.props.matchesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ matches }) {
    const matchesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.matchesDataSource = matchesDS.cloneWithRows({ ...matches });
  }

  render() {
    return (
      <View style={containerStyle}>
        <View
          style={{
            flex: 4,
            padding: 10,
            alignSelf: 'flex-start'
          }}
        >
          <Text style={textStyle}>Connections</Text>
          <ListView
            style={styles.container}
            dataSource={this.matchesDataSource}
            renderRow={(data) => <ConversationListItem {...data} />}
            enableEmptySections
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

const mapStateToProps = ({ matchSet }) => {
  const { matches } = matchSet;
  return { matches };
};

export default connect(mapStateToProps, { matchesFetch })(Matches);
